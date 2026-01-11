import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Api/axios";
import styles from "./Password.module.css";

const OTP_EXPIRY = 10 * 60; // 10 minutes

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");
  const otpStartTime = localStorage.getItem("otpStartTime");

  // Prevent direct access
  useEffect(() => {
    if (!email || !otpStartTime) {
      navigate("/forgot-password");
    }
  }, [email, otpStartTime, navigate]);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - otpStartTime) / 1000);
      const remaining = OTP_EXPIRY - elapsed;
      setTimeLeft(remaining > 0 ? remaining : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [otpStartTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await api.post("/auth/reset-password", {
        email,
        otp,
        password,
      });

      setMessage(res.data.message);

      localStorage.removeItem("resetEmail");
      localStorage.removeItem("otpStartTime");

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    }
  };

  const handleResend = async () => {
    setError("");
    setMessage("");

    try {
      const res = await api.post("/auth/forgot-password", { email });

      localStorage.setItem("otpStartTime", Date.now());
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <h5>Reset Your Password</h5>

        <form onSubmit={handleSubmit}>
          <label className={styles.label}>Enter OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className={styles.input}
            required
          />

          <label className={styles.label}>New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />

          <label className={styles.label}>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.input}
            required
          />

          <button className={styles.button}>Reset Password</button>
        </form>

        {timeLeft > 0 ? (
          <p className={styles.timer}>
            Resend OTP in {minutes}:{seconds.toString().padStart(2, "0")}
          </p>
        ) : (
          <button className={styles.linkBtn} onClick={handleResend}>
            Resend OTP
          </button>
        )}

        {message && <p className={styles.success}>{message}</p>}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </section>
  );
};

export default ResetPassword;
