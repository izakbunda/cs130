import {Task} from "./task";
import {v4 as uuidv4} from "uuid";
import React, {useState} from "react";
import {TaskAdder} from "./taskAdder";
import {TaskEditor} from "./taskEditor";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'


export const LogInPage = (props) => {
    const [userInput, setInput] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggingIn, setLoggingIn] = useState(true);

    const toggleLoggingIn = () => {
        setLoggingIn(!loggingIn);
        setInput('');
        setUsername('');
        setEmail('');
        setPassword('');
    }

    const handleLogIn = () => {
        console.log("submiting!");
        console.log("input: ", userInput);
        console.log("password: ", password);
        
    }

    const handleRegister = () => {
        console.log("Registering!");
        console.log("email: ", email);
        console.log("password: ", password);
    }


    return (
        <>
            <h1> TODOGOTCHI </h1>
            {loggingIn ? (
                <>
                    <input type="text" value={userInput} onChange={(e) => setInput(e.target.value)} className="TaskInputAdder" placeholder='Username or Email' />
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="TaskInputAdder" placeholder='Password' />
                    <button onClick={handleLogIn} className='TaskAddButton'>Log In</button>
                    <p>Don't have an account? 
                        <a onClick={toggleLoggingIn} href="#">Register</a> 
                    </p>
                </>
            ) : ( 
                <>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="TaskInputAdder" placeholder='Username' /> 
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="TaskInputAdder" placeholder='Email' /> 
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="TaskInputAdder" placeholder='Password' />
                    <button onClick={handleRegister} className='TaskAddButton'>Register Account</button>
                    <p>Already have an account? 
                        <a onClick={toggleLoggingIn} href="#">Log In</a> 
                    </p>
                </>

            )}
        </>

    )
}