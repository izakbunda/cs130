// import native react stuff
import React, { useState, useEffect, useRef } from 'react';

// import our components
import TaskProgressBar from './taskProgressBar';
import DateTimePicker from '../components/dateTime';

// import styling sheets
import '../css/task.css';
import '../css/dateTime.css';

export const Task = ({ taskText, id, status, startDate, dueDate, category, editingTask, onEditTask, editingDate, onEditDate, editingCategory, onEditCategory, endEditing, points, onCheckboxChange }) => {
    //console.log("Task: ", taskText, id);
    //console.log("date: ", editingDate);

    // local states
    const [checked, setChecked] = useState(false);
    const [taskName, setTaskName] = useState(taskText);
    const [dueDateCopy, setDueDateCopy] = useState(dueDate); //fixes issue of progress bar not loading when initially set

    // currently unused but may readd later
    const [changeInPoints, setChangeInPoints] = useState(0);

    // when 'enter' is pressed, edit task name
    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            onEditTask(id, taskName);
            endEditing();
        }
    }

    // when date change button is pushed, update the date
    const handleDateEnter = (enteredDate) => {
        console.log("running handleDateEnter");
        let localStart = new Date(startDate); //startDate is in UTC time zone
        endEditing();
        if (enteredDate == "T:00") {
            alert("no date entered.");
            console.log("no date");
        } else if (enteredDate < localStart) {
            alert("Cannot set due date in the past.");
            console.log("bad date");
            console.log("start: ", startDate);
            console.log("local start: ", localStart);
            console.log("entered: ", enteredDate);
        } else {
            console.log("good date");
            onEditDate(id, enteredDate); //this does not update the progress bar
            setDueDateCopy(enteredDate); //without this, the progress bar will not show up
        }
    };

    // Trach initial render
    const isFirstRender = useRef(true) ;

    // when the checkbox is clicked
    const handleChange = (event) => {
        const isChecked = event.target.checked;
        setChecked(isChecked); // directly use event's value
        onCheckboxChange(isChecked, id); // notify parent
    };

    // conversion of category to css styling
    const catToColor = {
        easy: '5px solid green',
        medium: '5px solid orange',
        hard: '5px solid red'
    };
    
    useEffect(() => {
        setChecked(status === 'pending' ? false : true)
    }, []);

    // return Task UI
    return (
        <div className='task-container' id={id}>
            <div className='checkbox-container' id={id}>
                <input 
                    type="checkbox" 
                    className='checkbox'
                    onChange={handleChange}
                    id={id}
                    checked={checked}
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
                        startDate={startDate} 
                        endDate={dueDateCopy} 
                        id={id}
                    />
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
