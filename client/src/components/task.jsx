import React, { useState } from 'react';
import {TaskProgressBar} from './taskProgressBar';
import Button from "../components/button";
import "../css/task.css";

export const Task = ({ taskText, id, startDate, dueDate }) => {
    const [checked, setChecked] = useState(false);

    return (
        <div className='task-container' id={id}>
            <div className='checkbox-container' id={id}>
                <input 
                    type="checkbox" 
                    className='checkbox'
                    onChange={() => {
                        setChecked(!checked)
                    }}
                    id={id}
                /> 
            </div>
            <div className='task-name-container' id={id}>
                <p className={`${checked ? "task-text-completed" : "task-text"}`} id={id}>{taskText}</p>
                {dueDate && (
                    <TaskProgressBar startDate={startDate} endDate={dueDate} id={id}/>
                )}
            </div>
        </div>
    )
}
