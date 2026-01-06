import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Answer.css";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Answer = () => {
  const { question_id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerText, setAnswerText] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Edit state
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  /* Redirect if not logged in */
  useEffect(() => {
    if (!user) navigate("/landing");
  }, [user, navigate]);

  /* Fetch question & answers */
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const qResponse = await api.get(`/question/${question_id}`);
      setQuestion(qResponse.data.question || qResponse.data.data);

      const aResponse = await api.get(`/answer/question/${question_id}`);
      setAnswers(aResponse.data.answers || []);
    } catch (err) {
      console.error("Failed to fetch question or answers:", err);
      toast.error("Failed to load question or answers");
    } finally {
      setLoading(false);
    }
  }, [question_id]);

  useEffect(() => {
    fetchData();
  }, [question_id, fetchData]);

  /* Submit answer */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!answerText.trim()) {
      return toast.error("Answer cannot be empty");
    }

    try {
      setSubmitting(true);

      await toast.promise(
        api.post(
          `/answer/question/${question_id}`,
          { answer: answerText.trim() },
          { headers: { Authorization: `Bearer ${token}` } }
        ),
        {
          pending: "Posting answer...",
          success: "Answer posted successfully",
          error: "Failed to post answer",
        }
      );

      setAnswerText("");
      fetchData();
    } finally {
      setSubmitting(false);
    }
  };

  /* Edit answer */
  const handleEdit = async (answer_id) => {
    if (!editText.trim()) {
      return toast.error("Answer cannot be empty");
    }

    try {
      await toast.promise(
        api.patch(
          `/answer/${answer_id}`,
          { answer: editText.trim() },
          { headers: { Authorization: `Bearer ${token}` } }
        ),
        {
          pending: "Updating answer...",
          success: "Answer updated",
          error: "Failed to update answer",
        }
      );

      setEditingId(null);
      setEditText("");
      fetchData();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update answer");
    }
  };

  /* Delete answer */
  const handleDelete = async (answer_id) => {
    if (!window.confirm("Are you sure you want to delete this answer?")) return;

    try {
      await toast.promise(
        api.delete(`/answer/${answer_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        {
          pending: "Deleting answer...",
          success: "Answer deleted",
          error: "Failed to delete answer",
        }
      );

      fetchData();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  /* Format date */
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) return <div className="loading">Loading...</div>;
  console.log("user:", user?.id, "answer owner:", answers.user_id);

  return (
    <div className="answer">
      {/* Question */}
      <div className="question__box">
        <h2>Question</h2>
        <h4>{question?.title}</h4>
        <p>{question?.description}</p>
      </div>

      {/* Answers */}
      <div className="answer__community">Answer From The Community</div>

      {answers.length === 0 && <p className="noAnswers">No answers yet</p>}

      {answers.map((answer) => (
        <div key={answer.answer_id} className="answer__info">
          <div className="user__container">
            <FaUserCircle className="user__icon" />
            <div className="mx-3">
              <div className="userName">{answer.user_name}</div>
              <span className="answerDate">
                {formatDate(answer.created_at)}
              </span>
            </div>
          </div>

          {/* View / Edit */}
          {editingId === answer.answer_id ? (
            <>
              <textarea
                className="question__form"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={() => handleEdit(answer.answer_id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <div className="answer__desc mt-4">{answer.content}</div>
          )}

          {/* Owner actions */}
          {user?.id === answer.user_id && (
            <div className="answer__actions">
              <button
                onClick={() => {
                  setEditingId(answer.answer_id);
                  setEditText(answer.content);
                }}
              >
                Edit
              </button>
              <button onClick={() => handleDelete(answer.answer_id)}>
                Delete
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Submit Answer */}
      <div className="answer__box">
        <div className="answer__topQuestion">Answer The Top Question</div>

        <div className="answer__link mt-2">
          <Link to="/home">Go to question page</Link>
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            className="question__form"
            placeholder="Your Answer here"
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            disabled={submitting}
          />

          <div className="answer__button">
            <button type="submit" disabled={submitting}>
              {submitting ? "Posting..." : "Post Your Answer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Answer;
