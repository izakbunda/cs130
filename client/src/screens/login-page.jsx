import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../css/index.css";
import "../css/login-page.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(true);

  const [missingEmail, setMissingEmail] = useState(false);
  const [missingPassword, setMissingPassword] = useState(false);
  const [missingEmailAndPassword, setMissingEmailAndPassword] = useState(false);
  const [nonexistentUser, setNonexistentUser] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  const navigate = useNavigate(); // For navigation

  // logic to return user to landing screen if already logged in
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      console.log("already logged in - go back to landing");
      // Redirect user to landing page or dashboard
      navigate("/landing");
    } else {
      console.log("ur good");
    }
  }, []);

  const toggleLoggingIn = () => {
    setLoggingIn(!loggingIn);
    setEmail("");
    setPassword("");
  };

  const login = async () => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const loggedIn = await loggedInResponse.json();
    console.log(loggedIn);

    if (loggedIn.token) {
      localStorage.setItem("jwt", loggedIn.token);
      localStorage.setItem("user_id", loggedIn.user._id);

      console.log(loggedIn.user.pets);

      if (loggedIn.user.pets.length > 0) {
        // console.log(
        //   "saving this pet into ur localstorage ",
        //   JSON.stringify(loggedIn.user.pets[0])
        // );
        localStorage.setItem("pet_id", loggedIn.user.pets[0]);
      }

      navigate("/landing");
    }
    // no email found in db
    else if (loggedIn.msg === "User does not exist. ") {
      setNonexistentUser(true);
      setWrongPassword(false);
    }
    // pw doesnt match email found in db
    else if (loggedIn.msg === "Invalid credentials. ") {
      setWrongPassword(true);
      setNonexistentUser(false);
    }
  };

  const register = async () => {
    const registerResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    const registered = await registerResponse.json();
    console.log(registered);

    if (registered.token) {
      localStorage.setItem("jwt", registered.token);
      localStorage.setItem("user_id", registered.user._id);

      navigate("/");
    }
  };

  const handleFormSubmit = async () => {
    if (!email && !password) {
      setMissingEmailAndPassword(true);
      setMissingEmail(false);
      setMissingPassword(false);
      return;
    }

    if (!email) {
      setMissingEmail(true);
      setMissingEmailAndPassword(false);
      setMissingPassword(false);
      return;
    }

    if (!password) {
      setMissingPassword(true);
      setMissingEmailAndPassword(false);
      setMissingEmail(false);
      return;
    }

    setMissingEmail(false);
    setMissingPassword(false);
    setMissingEmailAndPassword(false);

    console.log(loggingIn ? "logging in" : "registering");
    console.log("input: ", email);
    console.log("password: ", password);

    if (loggingIn) {
      await login();
    } else {
      await register();
    }
  };

  return (
    <div className="total-margin">
      <div className="login-container">
        <h1>Todogotchi</h1>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          placeholder="Email"
        />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          placeholder="Password"
        />
        {missingEmail ? (
          <p className="login-text" style={{ color: "red" }}>
            Write an email bud...
          </p>
        ) : missingPassword ? (
          <p className="login-text" style={{ color: "red" }}>
            Do you think we can just guess your password?
          </p>
        ) : missingEmailAndPassword ? (
          <p className="login-text" style={{ color: "red" }}>
            Go back and enter an email and password
          </p>
        ) : wrongPassword ? (
          <p className="login-text" style={{ color: "red" }}>
            Wrong password buddy
          </p>
        ) : nonexistentUser ? (
          <p className="login-text" style={{ color: "red" }}>
            Hey, I don't think you're registered... 🤔
          </p>
        ) : null}

        {loggingIn ? (
          <>
            <button onClick={handleFormSubmit} className="login-button">
              LOG IN
            </button>
            <div className="login-toggle-container">
              <p className="login-text">Don't have an account?</p>
              <p onClick={toggleLoggingIn} className="login-text-link">
                Register
              </p>
            </div>
          </>
        ) : (
          <>
            <button onClick={handleFormSubmit} className="login-button">
              REGISTER ACCOUNT
            </button>
            <div className="login-toggle-container">
              <p className="login-text">Already have an account?</p>
              <p onClick={toggleLoggingIn} className="login-text-link">
                Log In
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
