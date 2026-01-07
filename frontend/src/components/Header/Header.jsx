import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Header = () => {
  return (
    <div>
      {/* Simple header with page links */}
      <header style={{ padding: "10px", background: "#eee" }}>
        <nav>
          <Link to="/">Landing</Link> | <Link to="/home">Home</Link> |{" "}
          <Link to="/question/1">Question</Link> |{" "}
          <Link to="/ask-question">Ask Question</Link> |{" "}
          <Link to="/answer/1">Answer</Link> | <Link to="/login">Login</Link> |{" "}
          <Link to="/signup">Signup</Link>
        </nav>
      </header>

      {/* Page content will be rendered here */}
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Header;
