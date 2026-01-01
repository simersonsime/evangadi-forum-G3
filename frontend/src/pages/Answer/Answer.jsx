import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format, formatDistanceToNow } from "date-fns";
import { FaArrowLeft, FaPaperPlane, FaEdit, FaTrash } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

import styles from "./AnswerPage.module.css";
import axiosBase from "../../Api/axiosConfig";
import { AuthContext } from "../../Context/Context";
import Loader from "../../Components/Loader/Loader";
import Shared from "../../Components/Shared/Shared";

const api = (token) => ({
  get: (url) =>
    axiosBase.get(url, { headers: { Authorization: `Bearer ${token}` } }),
  post: (url, data) =>
    axiosBase.post(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
});

const time = (d) =>
  `${formatDistanceToNow(new Date(d), { addSuffix: true })} • ${format(
    new Date(d),
    "MMM d"
  )}`;

function Answer() {
  const { questionid } = useParams();
  const [{ user, token }] = useContext(AuthContext);
  const navigate = useNavigate();
  const answerRef = useRef();

  const [state, setState] = useState({
    q: {},
    a: [],
    loading: false,
    posting: false,
  });

  const apiReq = api(token);

  useEffect(() => {
    const load = async () => {
      setState((s) => ({ ...s, loading: true }));
      try {
        const [{ data: q }, { data: a }] = await Promise.all([
          apiReq.get(`/questions/${questionid}`),
          apiReq.get(`/answers/${questionid}`),
        ]);
        setState((s) => ({ ...s, q: q.question, a: a.answer }));
      } finally {
        setState((s) => ({ ...s, loading: false }));
      }
    };
    load();
  }, [questionid]);

  const postAnswer = async (e) => {
    e.preventDefault();
    if (!answerRef.current.value.trim()) return;

    setState((s) => ({ ...s, posting: true }));
    await apiReq.post("/answers/postanswer", {
      answer: answerRef.current.value,
      questionid,
    });
    answerRef.current.value = "";
    setState((s) => ({ ...s, posting: false }));
  };

  if (state.loading)
    return (
      <div className={styles.loadingContainer}>
        <Loader />
      </div>
    );

  return (
    <Shared>
      <div className={styles.main_wrapper}>
        <div className={styles.container}>
          {/* Back */}
          <button className={styles.backButton} onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
          </button>

          {/* Question */}
          <section className={styles.questionSection}>
            <div className={styles.questionCard}>
              <h2 className={styles.tagTitle}>{state.q.title}</h2>
              <p className={styles.questionContent}>{state.q.content}</p>
              {state.q.created_at && (
                <span className={styles.questionMeta}>
                  {time(state.q.created_at)}
                </span>
              )}
            </div>
          </section>

          {/* Answers */}
          <section className={styles.answersSection}>
            <h3 className={styles.sectionTitle}>Answers ({state.a.length})</h3>

            {state.a.length === 0 && (
              <div className={styles.noAnswers}>No answers yet</div>
            )}

            {state.a.map((ans) => (
              <div key={ans.answerid} className={styles.answerCard}>
                <p className={styles.answerContent}>{ans.content}</p>

                <div className={styles.answerFooter}>
                  <div className={styles.userInfo}>
                    <div className={styles.avatar}>
                      {ans.username?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className={styles.username}>{ans.username}</div>
                      <div className={styles.time}>{time(ans.created_at)}</div>
                    </div>
                  </div>

                  {user.userid === ans.userid && (
                    <div>
                      <button className={styles.editButton}>
                        <FaEdit />
                      </button>
                      <button className={styles.deleteButton}>
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </section>

          {/* Post Answer */}
          <section className={styles.answerFormSection}>
            <h3 className={styles.formTitle}>Your Answer</h3>
            <form onSubmit={postAnswer}>
              <textarea
                ref={answerRef}
                className={styles.answerInput}
                required
              />
              <button className={styles.postAnswerBtn} disabled={state.posting}>
                {state.posting ? (
                  <ClipLoader size={16} />
                ) : (
                  <>
                    <FaPaperPlane /> Post Answer
                  </>
                )}
              </button>
            </form>
          </section>
        </div>
      </div>
    </Shared>
  );
}

export default Answer;
