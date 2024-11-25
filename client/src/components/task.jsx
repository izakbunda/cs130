import React, { useState } from 'react';
import {TaskProgressBar} from './taskProgressBar';
import Button from "../components/button";
import "../css/task.css";

export const Task = ({ taskText, startDate, dueDate }) => {
    const [checked, setChecked] = useState(false);
    console.log(taskText, "start", startDate);
    console.log(taskText, "dueda", dueDate);
    if (dueDate == null) {
        console.log("null!");
    }

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
                {(dueDate != null) ? (
                    <TaskProgressBar startDate={startDate} endDate={dueDate}/>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}
