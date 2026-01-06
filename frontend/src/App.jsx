import React, { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home";
import Question from "./pages/Question/Question";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import Answer from "./pages/Answer/Answer";
<<<<<<< HEAD
import Login from "./pages/Login/Login";
// import NotFound from "./Pages/NotFound/NotFound";
import Signup from "./pages/Signup/Signup";
import About from "./components/About/About";

=======
import Login from "./components/Login/Login";
// import NotFound from "./pages/NotFound/NotFound";
import Signup from "./components/Signup/Signup";

export const UserState = createContext();
>>>>>>> b858aa7af3915d73b4a0c3e14754af87f8c44f87

function App() {
  const [user, setUser] = useState(null); // placeholder user state
  return (
<<<<<<< HEAD
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Landing />} />
        <Route path="home" element={<Home />} />
        <Route path="question/:id" element={<Question />} />
        <Route path="ask-question" element={<AskQuestion />} />
        <Route path="answer/:id" element={<Answer />} />

        <Route path="login" element={<Login />} />
        <Route path="login" element={<Signup />} />
           <Route path="about" element={<About />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
=======
    <UserState.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Landing />} />
          <Route path="home" element={<Home />} />
          <Route path="question/:id" element={<Question />} />
          <Route path="ask-question" element={<AskQuestion />} />
          <Route path="answer/:id" element={<Answer />} />
          <Route path="login" element={<Login />} />
          <Route path="login" element={<Signup />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </UserState.Provider>
>>>>>>> b858aa7af3915d73b4a0c3e14754af87f8c44f87
  );
}

export default App;
