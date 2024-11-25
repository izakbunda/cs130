import React, { useState } from 'react';
import {ProgressBar} from './progressBar';
import Button from "../components/button";
import "../css/task.css";

export const Task = ({ taskText }) => {
    const [checked, setChecked] = useState(false);

    return (
        <div className='task-container'>
            <div className='checkbox-container'>
                <input 
                    type="checkbox" 
                    className='checkbox'
                    onChange={() => {
                        setChecked(!checked)
                    }}/> 
            </div>
            <div className='task-name-container'>
                <p className={`${checked ? "task-text-completed" : "task-text"}`}>{taskText}</p>
            </div>
        </div>
    )
}
