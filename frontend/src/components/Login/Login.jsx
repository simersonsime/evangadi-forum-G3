import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../Api/axios";
import { useAuth } from "../../context/AuthContext";
import styles from "../Login/Login.module.css";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = ({ switchToSignup }) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("1. Form submitted");

    const email = emailRef.current?.value.trim();
    const password = passwordRef.current?.value;

    console.log("2. Email:", email, "Password:", password);

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    try {
      console.log("3. Making API call to /user/login");

      const { data } = await api.post(
        "/user/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("4. API Response:", data);
      console.log("5. Token received:", data.token?.substring(0, 20) + "...");

      // login saves token and user to global state (and localStorage)
      login(data.token, data.user);

      //  IMMEDIATE LOCALSTORAGE CHECK
      console.log("6. Checking localStorage:");
      console.log("- Token:", localStorage.getItem("token"));
      console.log("- User:", localStorage.getItem("user"));

      // clear inputs
      emailRef.current.value = "";
      passwordRef.current.value = "";

      //  IMMEDIATE REDIRECT
      console.log("7. Redirecting to /home");
      navigate("/home");
      // OR force refresh: window.location.href = "/home";
    } catch (err) {
      console.error("8. Login error:", err);
      console.error("Error response:", err.response?.data);
      setError(
        err.response?.data?.message || "Login failed. Please check credentials."
      );
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <h2 className={styles.title}>Login to your account</h2>

        <p className={styles.subtitle}>
          Don&apos;t have an account?
          <span className={styles.inlineLink} onClick={switchToSignup}>
            Create a new account
          </span>
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}

          {/* Email Field */}
          <input
            ref={emailRef}
            type="email"
            placeholder="Your Email"
            className={styles.input}
          />

          {/* Pasword Field */}
          <div className={styles.passwordWrapper}>
            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className={styles.input}
            />
            <span
              className={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          {/* Forgot password */}
          <div className={styles.forgotWrapper}>
            <Link to="/forgot-password" className={styles.forgotLink}>
              Forgot password?
            </Link>
          </div>
          <button type="submit" className={styles.submitBtn}>
            submit
          </button>
        </form>

        <p className={styles.bottomLink} onClick={switchToSignup}>
          Create an account?
        </p>
      </div>
    </div>
  );
};

export default Login;
