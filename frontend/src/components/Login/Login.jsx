import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import  api  from "../../Api/axios";
import { useAuth } from "../../context/AuthContext";
import classes from "./Login.module.css";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

function Login({ toggleForm }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  }
  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please provide all required information");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const { data } = await api.post("/users/login", {
        email,
        password,
      });

      login(data.token, { username: data.username });
      navigate("/");
    } catch (error) {
      console.log(error)
      setErrorMessage("Login failed.");
    } finally {
      setLoading(false);
    }
  }

  const handleCreateAccountClick = () => {
    navigate('/signup');
  };

  return (
    <section className={classes.Login_Wrapper}>
      <div className={classes.centered_container}>
        <div className={`${classes.login_box}`}>
          <h5>Login to Your Account</h5>
          <br />
          <h6>
            Don’t have an account?{" "}
            <span
              className={classes.create}
              role="button"
              onClick={handleCreateAccountClick}
            >
              Create a new account
            </span>
          </h6>
          <br />
          {errorMessage && (
            <p style={{ marginBottom: "20px", color: "red" }}>{errorMessage}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className={`${classes.formGroup}`}>
              <input
                id="email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={classes.input}
                required
              />
            </div>
            <div className={`${classes.formGroup}`}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={classes.input}
                required
              />
              <span className={classes.eyes} onClick={passwordVisibility}>
                {showPassword ? (
                  <FaEye className={classes.activeEye} size={20} />
                ) : (
                  <FaEyeSlash size={20} />
                )}
              </span>
            </div>
            <Link to="/forgot-password" className={classes.forgotPasswordLink}>
              Forgot password?
            </Link>
            <button
              type="submit"
              className={`${classes.loginButton}`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "LOGIN"}
            </button>
          </form>
          <p className={classes.register_link}>
            {/* Don't have an account?{" "} */}
            {/* <span
              className={classes.highlightText}
              role="button"
              onClick={toggleForm}
            >
              Create a new account
            </span> */}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;