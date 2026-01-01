import React, { useState } from "react";
import styles from "./AskQuestion.module.css";

const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please fill in all fields");
      return;
    }

    // API integration will be added later
    console.log({ title, description });

    setTitle("");
    setDescription("");
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Instruction Section */}
      <section className={styles.instructions}>
        <h2>Steps to write a good question</h2>
        <ul>
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>Review your question and post it to the site.</li>
        </ul>
      </section>

      {/* Form Card */}
      <section className={styles.card}>
        <h3>Ask a public question</h3>
        <p className={styles.subText}>Go to Question page</p>

        <form onSubmit={handleSubmit} className={styles.form}>
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
