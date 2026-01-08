import React, { useState, useEffect } from "react";
import styles from "./CommentBox.module.css";

const CommentBox = ({ answerid }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
 
  const loadComments = async () => {
    const res = await fetch(`http://localhost:4000/api/comments/${answerid}`);
    const data = await res.json();
    setComments(data.comments || []);
  };

  useEffect(() => {
    if (show) loadComments();
  }, [show]);

   const handlePost = async () => {
    if (!text.trim()) return;

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await fetch("http://localhost:4000/api/comments/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        answerid: answerid,  
        comment_body: text.trim(),  
        userid: user?.id, 
      }),
    });

    const data = await res.json();
    console.log("Response:", data);

    if (res.ok) {
      setText("");
      loadComments();
    }
  };

  return (
    <div className={styles.container}>
      <button onClick={() => setShow(!show)} className={styles.btn}>
        {show ? "Hide" : "Comment"} ({comments.length})
      </button>

      {show && (
        <>
          <div className={styles.input}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Your comment..."
              rows="2"
            />
            <button onClick={handlePost} className={styles.post}>
              Post
            </button>
          </div>

          <div className={styles.list}>
            {comments.map((c) => (
              <div key={c.comment_id} className={styles.item}>
                <p>{c.comment_body}</p>
                <small>
                  By: {c.username || `User ${c.user_id || c.userid}`}
                </small>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CommentBox;
