import { useEffect, useState } from "react";
import styles from "./Question.module.css";

function Question() {
  const [questions, setQuestions] = useState([]); // Store all questions
  const [loading, setLoading] = useState(false); // Loading state
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [currentPage, setCurrentPage] = useState(1); // Pagination
  const questionsPerPage = 5;

  // -----------------------------
  // TEMP: Fake API data for now
  // Replace this block with real API call when backend is ready
  // -----------------------------
  useEffect(() => {
    setLoading(true);

    const fakeQuestions = [
      {
        questionid: 1,
        title: "Example Question 1",
        description: "This is the description for question 1.",
        username: "UserA",
        createdAt: "2026-01-03",
      },
      {
        questionid: 2,
        title: "Example Question 2",
        description: "This is the description for question 2.",
        username: "UserB",
        createdAt: "2026-01-02",
      },
      {
        questionid: 3,
        title: "Example Question 3",
        description: "This is the description for question 3.",
        username: "UserC",
        createdAt: "2026-01-01",
      },
    ];

    setTimeout(() => {
      setQuestions(fakeQuestions);
      setLoading(false);
    }, 500);
  }, []);

  // -----------------------------
  // Filter questions based on search query
  // -----------------------------
  const filteredQuestions = questions.filter(
    (q) =>
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // -----------------------------
  // Pagination logic
  // -----------------------------
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  const handlePrevious = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div className={styles.container}>
      {/* Search input */}
      <div className={styles.search_question}>
        <input
          type="text"
          placeholder="Search for a question"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <hr />
      <h1 className={styles.title}>Questions</h1>

      {/* Loading state */}
      {loading ? (
        <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>
      ) : filteredQuestions.length === 0 ? (
        <div
          style={{
            display: "flex",
            marginTop: "60px",
            fontSize: "25px",
            color: "var(--primary-color)",
            marginBottom: "200px",
            justifyContent: "center",
          }}
        >
          <p>No Questions Found</p>
        </div>
      ) : (
        <>
          {/* Question cards */}
          {currentQuestions.map((q) => (
            <div key={q.questionid} className={styles.questionCard}>
              <h3>{q.title}</h3>
              <p>{q.description}</p>
              <span>
                By: {q.username} | {q.createdAt}
              </span>

              {/* TODO: Replace this <div> with <QuestionCard /> component
                  once the backend and QuestionCard component are ready:
                  
                  <QuestionCard
                    key={q.questionid}
                    id={q.questionid}
                    userName={q.username}
                    questionTitle={q.title}
                    description={q.description}
                    question_date={q.createdAt}
                  />
              */}
            </div>
          ))}

          {/* Pagination controls */}
          <div className={styles.pagination}>
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              style={{ marginRight: "10px", padding: "10px" }}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              style={{ marginLeft: "10px", padding: "10px" }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Question;
