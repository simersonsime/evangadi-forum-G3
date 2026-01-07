import React from "react";
import { Routes, Route } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home";
import Question from "./pages/Question/Question";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import Answer from "./pages/Answer/Answer";
import Login from "./pages/Login/Login";
// import NotFound from "./Pages/NotFound/NotFound";
import Signup from "./pages/Signup/Signup";
import "bootstrap/dist/css/bootstrap.min.css"; 
import TestCommentsPage from "./components/TestCommentsPage";


function App() {
  return (
    <Routes>
      <Route path="/test-comments" element={<TestCommentsPage />} />
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Landing />} />
        <Route path="home" element={<Home />} />
        <Route path="question/:id" element={<Question />} />
        <Route path="ask-question" element={<AskQuestion />} />
        <Route path="answer/:id" element={<Answer />} />

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
