import React, { useState } from "react";
import "../css/index.css";
import "../css/login-page.css";

function LogInPage() {
    const [userInput, setInput] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggingIn, setLoggingIn] = useState(true);

    const toggleLoggingIn = () => {
        setLoggingIn(!loggingIn);
        setInput("");
        setEmail("");
        setPassword("");
    };

    const handleLogIn = () => {
        console.log("submiting!");
        console.log("input: ", userInput);
        console.log("password: ", password);
    };

    const handleRegister = () => {
        console.log("Registering!");
        console.log("email: ", email);
        console.log("password: ", password);
    };

    return (
        <div className="total-margin">
            <div className="login-container">
                <h1>Todogotchi</h1>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setInput(e.target.value)}
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
                {loggingIn ? (
                    <>
                        <button onClick={handleLogIn} className="login-button">
                            LOG IN
                        </button>
                        <div className="login-toggle-container">
                            <p className="login-text">Don't have an account?</p>
                            <p onClick={toggleLoggingIn} className="login-text-link">Register</p> 
                        </div>
                    </>
                ) : (
                    <>
                        <button onClick={handleRegister} className="login-button">
                            REGISTER ACCOUNT
                        </button>
                        <div className="login-toggle-container">
                            <p className="login-text">Already have an account?</p>
                            <p onClick={toggleLoggingIn} className="login-text-link">Log In</p> 
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default LogInPage;