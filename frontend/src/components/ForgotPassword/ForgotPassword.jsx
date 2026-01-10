import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Api/axios";
import styles from "./Password.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await api.post("/auth/forgot-password", { email });

      localStorage.setItem("resetEmail", email);
      localStorage.setItem("otpStartTime", Date.now());

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/reset-password");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <h5>Forgot Password</h5>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />

          <button className={styles.button}>Send OTP</button>
        </form>

        {message && <p className={styles.success}>{message}</p>}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </section>
  );
};

export default ForgotPassword;
