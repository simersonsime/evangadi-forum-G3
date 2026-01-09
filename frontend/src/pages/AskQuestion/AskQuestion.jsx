import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AskQuestion.module.css";
import api from "../../Api/axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const [loadingPreview, setLoadingPreview] = useState(false);
  const [error, setError] = useState(null);

  const [aiPreview, setAiPreview] = useState({
    title: "",
    description: "",
    tags: [],
  });

  const navigate = useNavigate();
  const { user, token } = useAuth();

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  if (!user) return null;

  /** ===== AI Preview (Optional) ===== */
  const handleAIAssistPreview = async () => {
    if (!title.trim() || !description.trim()) {
      return toast.error(
        "Please provide both title and description for AI preview."
      );
    }

    try {
      setLoadingPreview(true);

      const res = await api.post(
        "/ai/question-assist",
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAiPreview({
        title: res.data.improved_title,
        description: res.data.improved_description,
        tags: res.data.suggested_tags || [],
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "AI preview is temporarily unavailable."
      );
    } finally {
      setLoadingPreview(false);
    }
  };

  /** ===== Apply AI Suggestions ===== */
  const applyAIPreview = () => {
    setTitle(aiPreview.title);
    setDescription(aiPreview.description);
    setTags(aiPreview.tags.join(", "));
    setAiPreview({ title: "", description: "", tags: [] });
    toast.success("AI suggestions applied!");
  };

  /** ===== Submit Question (Always works) ===== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      await toast.promise(
        api.post("/question", payload, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        {
          pending: "Posting your question...",
          success: "Question posted successfully!",
          error: "Failed to post question. Please try again.",
        }
      );

      // Clear form
      setTitle("");
      setDescription("");
      setTags("");
      setAiPreview({ title: "", description: "", tags: [] });

      setTimeout(() => navigate("/home"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post question.");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Instructions */}
      <section className={styles.instructions}>
        <h2>Steps to write a good question</h2>
        <ul>
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>Review your question and post it to the site.</li>
        </ul>
      </section>

      {/* Ask Question Form */}
      <section className={styles.card}>
        <h3>Ask a public question</h3>
        <Link to="/home" className={styles.subText}>
          Go to Question page
        </Link>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <p className={styles.error}>{error}</p>}

          <input
            type="text"
            placeholder="Title"
            value={title}
            maxLength={200}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Question Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className={styles.tagRow}>
            <input
              type="text"
              placeholder="tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className={styles.searchInput}
            />

            {/* AI Preview and post Button */}
            <div className={styles.buttonRow}>
              <button type="submit">Post Your Question</button>
              <button
                type="button"
                onClick={handleAIAssistPreview}
                disabled={loadingPreview}
                className={styles.aiButton}>
                {loadingPreview
                  ? "Generating AI Preview..."
                  : "AI Assist / Preview"}
              </button>
            </div>
          </div>
        </form>

        {/* AI Live Preview Panel */}
        {(aiPreview.title || aiPreview.description) && (
          <section className={styles.aiPreview}>
            <h4>AI Suggestions Preview</h4>
            <p>
              <strong>Title:</strong> {aiPreview.title}
            </p>
            <p>
              <strong>Description:</strong> {aiPreview.description}
            </p>
            {aiPreview.tags.length > 0 && (
              <p>
                <strong>Suggested Tags:</strong> {aiPreview.tags.join(", ")}
              </p>
            )}
            <button
              type="button"
              onClick={applyAIPreview}
              className={styles.aiButton}>
              Apply AI Suggestions
            </button>
          </section>
        )}
      </section>
    </div>
  );
};

export default AskQuestion;
