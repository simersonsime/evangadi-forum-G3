import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AskQuestion.module.css";
import {api} from "../../Api/axios"
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { user, token } = useAuth();

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }

    // Wrap the API call in a promise for toast.promise
    const postQuestionPromise = api.post(
      "/question",
      {
        title: title.trim(),
        description: description.trim(),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    toast.promise(
      postQuestionPromise,
      {
        pending: "Posting your question...",
        success: "Question posted successfully!",
        error: "Failed to post question. Please try again.",
      },
      {
        autoClose: 1000,
      }
    );

    try {
      await postQuestionPromise;

      // Clear form
      setTitle("");
      setDescription("");

      // Redirect after toast shows
      setTimeout(() => {
        navigate("/home");
      }, 1000); // match autoClose
    } catch (err) {
      console.error("Post question error:", err.response?.data?.message);
      setError(err.response?.data?.message || "Failed to post question.");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <section className={styles.instructions}>
        <h2>Steps to write a good question</h2>
        <ul>
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>Review your question and post it to the site.</li>
        </ul>
      </section>

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

          <button type="submit">Post Your Question</button>
        </form>
      </section>
    </div>
  );
};

export default AskQuestion;
