import React, { useState } from 'react';
import {TaskProgressBar} from './taskProgressBar';
import "../css/task.css";

import DateTimePicker from '../components/dateTime'
import '../css/dateTime.css'

export const Task = ({ taskText, id, startDate, dueDate, category, editingTask, onEditTask, editingDate, onEditDate, editingCategory, onEditCategory, endEditing, points }) => {
    //console.log("Task: ", taskText, id);
    //console.log("date: ", editingDate);

    const [checked, setChecked] = useState(false);
    const [taskName, setTaskName] = useState(taskText);
    const [dueDateCopy, setDueDateCopy] = useState(dueDate); //fixes issue of progress bar not loading when initially set

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            console.log("enter")
            onEditTask(id, taskName);
            endEditing();
        }
    }

    const handleDateEnter = (enteredDate) => {
        console.log("running handleDateEnter")
        endEditing();
        if (enteredDate == "T:00") {
            alert("no date entered.")
            console.log("no date")
        } else if (enteredDate < startDate) {
            alert("Cannot set due date in the past.")
            console.log("bad date");
        } else {
            console.log("good date")
            onEditDate(id, enteredDate); //this does not update the progress bar
            setDueDateCopy(enteredDate); //without this, the progress bar will not show up
        }
    }

    const catToColor = {
        "easy": "5px solid green",
        "medium": "5px solid orange",
        "hard": "5px solid red"
    }

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
                {editingTask ? (
                    <input
                        type="text"
                        value={taskName} 
                        onChange={(e) => setTaskName(e.target.value)} 
                        onKeyDown={handleEnter}
                        autoFocus
                        className="task-input-edit" 
                  />
                ) : (
                    <p className={`${checked ? "task-text-completed" : "task-text"}`} id={id}>{taskName}</p>
                )}
                
                {dueDateCopy && (
                    <TaskProgressBar 
                        tartDate={startDate} 
                        endDate={dueDateCopy} 
                        id={id}/>
                )}
            </div>
            {editingCategory ? (
                <div className='category-list'>
                    <div className='category-button easy' onClick={() => {onEditCategory(id, "easy")}}>easy</div>
                    <div className='category-button medium' onClick={() => {onEditCategory(id, "medium")}}>medium</div>
                    <div className='category-button hard' onClick={() => {onEditCategory(id, "hard")}}>hard</div>
                </div>
            ) : (
                <div style={{alignItem: 'center'}}> 
                    <div className='category-indicator' style={{ border: catToColor[category] }}></div>
                </div>
            )}
            {editingDate && (
                <DateTimePicker
                    left={points.x}
                    top={points.y}
                    defaultDate={dueDateCopy ? (dueDateCopy.slice(0,10)) : ''}
                    defaultTime={dueDateCopy ? (dueDateCopy.slice(11,19)) : ''}
                    onPress={handleDateEnter}
                    actionOnInvalid={endEditing}
                />
            )}
        </div>
    )
}
