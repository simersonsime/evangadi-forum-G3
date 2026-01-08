// import React, { createContext, useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import SharedLayout from "./components/SharedLayout/SharedLayout";
// import Landing from "./pages/Landing/Landing";
// import Home from "./pages/Home/Home";
// import Question from "./pages/Question/Question";
// import AskQuestion from "./pages/AskQuestion/AskQuestion";
// import Answer from "./pages/Answer/Answer";
// import NotFound from "./pages/NotFound/NotFound";

// // export const UserState = createContext();

// function App() {
//   // const [user, setUser] = useState(null); // placeholder user state
//   return (
//     // <UserState.Provider value={{ user, setUser }}>
//       <Routes>
//         <Route path="/" element={<SharedLayout />}>
//           <Route index element={<Landing />} />
//           <Route path="home" element={<Home />} />
//           <Route path="question/:id" element={<Question />} />
//           <Route path="ask-question" element={<AskQuestion />} />
//           <Route path="answer/:id" element={<Answer />} />
//           <Route path="*" element={<NotFound />} />
//         </Route>
//       </Routes>
//     {/* </UserState.Provider> */}
//   );
// }

// export default App;

import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Howitworks from "./pages/Howitworks/Howitworks";

import { Routes, Route } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import Landing from "./pages/Landing/Landing";
import Home from "./Pages/Home/Home"; //
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import Answer from "./pages/Answer/Answer";
import NotFound from "./Pages/NotFound/NotFound";
import About from "./components/About/About";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import ForgotPassword from "./components/Login/ForgotPassword";
import ResetPassword from "./components/Login/ResetPassword";
import Login from "./components/Login/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Landing />} />
          <Route path="home" element={<Home />} />
          <Route path="ask-question" element={<AskQuestion />} />
          <Route path="answer/:id" element={<Answer />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="answer/:question_id" element={<Answer />} />
          <Route path="login" element={<Login/>} />

          <Route path="*" element={<NotFound />} />
          <Route path="how-it-works" element={<Howitworks />} />
        </Route>
      </Routes>

      {/*  Toast system */}
      <ToastContainer position="top-center" autoClose={1500} />
    </>
  );
}

export default App;
