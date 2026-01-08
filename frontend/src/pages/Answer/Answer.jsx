import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Answer.css";
import api from "../../Api/axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import CommentBox from "../../components/Comments/CommentSection"; // Import CommentBox

const Answer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [question, setQuestion] = useState({});
  const [answerText, setAnswerText] = useState("");
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/landing");
    }
  }, [user, navigate]);

  // Fetch question
  useEffect(() => {
    const fetchQuestion = async () => {
      const response = await api.get(`/question/${id}`);
      setQuestion(response.data.question || response.data.data);
    };
    fetchQuestion();
  }, [id]);

  // Fetch answers
  useEffect(() => {
    const fetchAnswers = async () => {
      const response = await api.get(`/answer/${id}`);
      const answersData = response.data.answers || response.data.data || [];
      setAnswers(answersData);
    };
    fetchAnswers();
  }, [id, answers.length]);

  // Submit answer
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!answerText.trim()) {
      return toast.error("Answer cannot be empty");
    }

    try {
      await api.post(
        `/answer/${id}`,
        {
          answer: answerText.trim(),
          user_id: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Answer posted successfully!");

      // Refresh answers
      if (answers.length === 0) {
        setAnswers([""]);
      } else {
        setAnswers([]);
      }

      setAnswerText("");
    } catch (err) {
      toast.error("Failed to post answer");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="answer">
      <hr />
      <div className="answer__container">
        <h3>Question</h3>
        <h5 className="question__line mb-3">{question?.title}</h5>
        <p>{question?.description}</p>
        <hr />

        <h3 className="answer__community">Answer From The Community</h3>
        <hr />

        {answers &&
          answers.map((item) => (
            <div key={item.answer_id}>
              <div className="answer__info">
                <div className="question__icon">
                  <div className="icon">
                    <span>
                      <FaUserCircle style={{ fontSize: "45px" }} />
                      <p className="mx-3" style={{ fontSize: "14px" }}>
                        {item.username || item.first_name || "Anonymous"}
                      </p>
                    </span>
                  </div>
                  <div className="answer__desc mt-4">
                    {item.answer_body || item.answer}
                  </div>
                </div>
              </div>

              {/* Simple CommentBox for each answer */}
              <CommentBox answerid={item.answer_id} />
            </div>
          ))}

        <div className="answer__box">
          <div className="answer__topQuestion">Answer The Top Question</div>

          <div className="answer__link mt-2">
            <Link to="/home">Go to question page</Link>
          </div>

          <br />

          <form onSubmit={handleSubmit}>
            <textarea
              className="question__form"
              name="answer"
              cols="110"
              rows="10"
              placeholder="Your Answer here"
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
            ></textarea>

            <br />
            <br />

            <div className="answer__button">
              <button type="submit">Post Your Answer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Answer;
