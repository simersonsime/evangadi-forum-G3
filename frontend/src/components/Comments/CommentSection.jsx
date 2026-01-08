import React, { useState, useEffect } from "react";
import styles from "./CommentBox.module.css";

const CommentBox = ({ answerid }) => {
  const [comments, setComments] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userid, setUserid] = useState(""); // Add userid state

  // Load comments AND get user ID
  useEffect(() => {
    loadComments();
    // Get user ID from localStorage or token
    const token = localStorage.getItem("token");
    if (token) {
      // Decode token to get user ID or get from localStorage
      const userIdFromStorage = localStorage.getItem("userid");
      if (userIdFromStorage) {
        setUserid(userIdFromStorage);
      }
    }
  }, [answerid]);

  const loadComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/comments/${answerid}`
      );
      const data = await response.json();
      setComments(data.comments || []);
    } catch (error) {
      console.log("Couldn't load comments", error);
    }
  };

  // Post new comment - FIXED REQUEST BODY
  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      // Get user ID - you need to get this from your auth system
      // If you don't have userid in localStorage, you might need to:
      // 1. Get it from decoded token
      // 2. Get it from user context/state
      // 3. Or your backend might get it from the token automatically

      const requestBody = {
        comment_body: newComment, // This is what your backend expects
        answer_id: answerid, // This is what your backend expects
        userid: userid, // Add user ID
        // Note: 'text' field is NOT needed based on your working request
      };

      console.log("Sending request body:", requestBody);

      const response = await fetch("http://localhost:4000/api/comments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log("Response from backend:", data);

      if (response.ok) {
        // Reload comments after posting
        loadComments();
        setNewComment("");
        setShowInput(false);
      } else {
        console.log("Failed to post comment:", data.message);
        alert("Failed to post comment: " + data.message);
      }
    } catch (error) {
      console.log("Error posting comment:", error);
      alert("Network error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete comment
  const handleDeleteComment = async (commentid) => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:4000/api/comments/${commentid}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Remove deleted comment from list
        setComments(
          comments.filter((comment) => comment.comment_id !== commentid)
        );
      }
    } catch (error) {
      console.log("Error deleting comment",  error);
    }
  };

  // Cancel button
  const handleCancel = () => {
    setShowInput(false);
    setNewComment("");
  };

  return (
    <div className={styles.commentSection}>
      {/* Debug info - remove in production */}
      <div style={{ fontSize: "12px", color: "#666", marginBottom: "10px" }}>
        Answer ID: {answerid} | User ID: {userid || "Not set"}
      </div>

      {!showInput && (
        <button
          className={styles.commentBtn}
          onClick={() => setShowInput(true)}
        >
          Comment
        </button>
      )}

      {showInput && (
        <div className={styles.inputBox}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment..."
            rows="3"
            disabled={isLoading}
          />
          <div className={styles.buttons}>
            <button
              onClick={handlePostComment}
              disabled={isLoading || !newComment.trim() || !userid}
            >
              {isLoading ? "Posting..." : "Post"}
            </button>
            <button onClick={handleCancel} disabled={isLoading}>
              Cancel
            </button>
          </div>
          {!userid && (
            <div style={{ color: "red", fontSize: "12px", marginTop: "10px" }}>
              Error: User ID not found. Please log in again.
            </div>
          )}
        </div>
      )}

      <div className={styles.commentsList}>
        {comments.map((comment) => (
          <div key={comment.comment_id} className={styles.comment}>
            <p>{comment.comment_body}</p>
            <div className={styles.commentFooter}>
              <small>
                User {comment.user_id} •
                {new Date(comment.created_at).toLocaleDateString()}
              </small>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDeleteComment(comment.comment_id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentBox;
