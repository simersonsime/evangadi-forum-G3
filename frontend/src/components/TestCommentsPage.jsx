// TestCommentsPage.jsx
import React from "react";
import CommentBox from "./Comments/CommentSection"

function TestCommentsPage() {
  // Use a hardcoded answer_id for testing
  const testAnswerId = 1;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Test Comments Page</h1>
      <p>Testing comment functionality with answer_id: {testAnswerId}</p>

      <div
        style={{
          background: "#f9f9f9",
          padding: "20px",
          borderRadius: "8px",
          margin: "20px 0",
        }}
      >
        <h3>Answer Content (Dummy)</h3>
        <p>This is a test answer content. Comments should appear below.</p>
      </div>

      <CommentBox answerid={testAnswerId} />
    </div>
  );
}


export default TestCommentsPage;
