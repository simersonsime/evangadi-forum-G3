import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Helper: check auth & required fields
const validateRequest = (req, res, fields = []) => {
  if (!req.user?.id) {
    res
      .status(401)
      .json({ error: "Unauthorized", message: "Authentication required" });
    return false;
  }

  for (const field of fields) {
    if (!req.body[field] || !req.body[field].trim()) {
      res
        .status(400)
        .json({ error: "Bad Request", message: `${field} is required` });
      return false;
    }
  }

  return true;
};

/**
 * AI Assist for Question (single call)
 * Endpoint: POST /api/ai/question-assist
 * Returns improved title, description, and suggested tags
 * Protected route (requires JWT)
 */
export const assistQuestion = async (req, res) => {
  if (!validateRequest(req, res, ["title", "description"])) return;

  const { title, description } = req.body;

  // Fast fallback if AI disabled
  if (process.env.ENABLE_AI !== "true") {
    const tags = [
      ...new Set(
        title
          .toLowerCase()
          .split(/\s+/)
          .filter((w) => w.length > 4)
          .slice(0, 5)
      ),
    ];
    return res.json({
      improved_title: title,
      improved_description: description,
      suggested_tags: tags,
    });
  }

  try {
    // 1 API call: improve + suggest tags
    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: `You are a professional editor and software design expert. 
Correct all spelling, grammar, and punctuation errors in the title and description. 
Improve clarity and readability without changing the meaning.
Also, suggest 2–4 relevant tags for the question. Return tags as lowercase words only, without punctuation.
      
Return a JSON object exactly like this format:
{
  "title": "improved title",
  "description": "improved description",
  "tags": ["tag1", "tag2"]
}

Title:
${title}

Description:
${description}`,
    });

    const text =
      response.output_text || response.output?.[0]?.content?.[0]?.text || "";

    // Remove invisible characters
    const cleanText = text.replace(/[\u200B-\u200D\uFEFF]/g, "").trim();

    // Parse JSON safely
    let result = { title, description, tags: [] };
    try {
      const parsed = JSON.parse(cleanText);
      result.title = parsed.title || title;
      result.description = parsed.description || description;
      result.tags = Array.isArray(parsed.tags)
        ? parsed.tags
            .map((t) => t.toLowerCase().replace(/[^a-z0-9]+/g, ""))
            .filter(Boolean)
        : [];
    } catch {
      // fallback: return original text + empty tags
      result.title = title;
      result.description = cleanText || description;
      result.tags = [];
    }

    return res.json({
      improved_title: result.title,
      improved_description: result.description,
      suggested_tags: result.tags,
    });
  } catch (err) {
    console.error("AI Assist Error:", err);
    return res.json({
      improved_title: title,
      improved_description: description,
      suggested_tags: [],
    });
  }
};
