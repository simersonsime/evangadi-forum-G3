import React, { useState } from "react";
import About from "../../components/About/About.jsx";
import Login from "../../components/Login/Login";
import Signup from "../../components/Signup/Signup";
import styles from "./Landing.module.css";

const Landing = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles.wrapper}>
      <div className={styles.authSection}>
        {isLogin ? (
          <Login switchToSignup={() => setIsLogin(false)} />
        ) : (
          <Signup switchToLogin={() => setIsLogin(true)} />
        )}
      </div>

      <div className={styles.aboutSection}>
        <About />
      </div>
    </div>
  );
};

export default Landing;
