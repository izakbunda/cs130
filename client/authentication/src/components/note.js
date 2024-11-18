import {Task} from "./task";
import {v4 as uuidv4} from "uuid";
import React, {useState} from "react";
import {TaskAdder} from "./taskAdder";
import {TaskEditor} from "./taskEditor";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'


export const Note = (props) => {
  // track states (list of tasks)
  const [tasks, setTasks] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  // add a Task to the list
  const addTask = (task, startDate, endDate) => {

    setTasks([...tasks, { 
      id: uuidv4(), 
      todo: task, 
      start: startDate,
      end: endDate,
      completed: false, 
      isEditing: false },
    ]);
  }

  // toggle task adder
  const toggleIsAdding = () => {
    setIsAdding(!isAdding);
  }

  // delete a Task from the list
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => 
      task.id !== id
    ));
  };


  // toggle if a task is Complete or not
  const toggleComplete = (id) => {
    setTasks(tasks.map((task) => 
        task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }

  // request to edit a task name
  const editTask = (id) => {
    setTasks(tasks.map((task) => 
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
    ));
  }

  // submit new task name
  const editTodo = (newName, newDueDate, id) => {
    setTasks(tasks.map((task) => 
        task.id === id ? { ...task, todo: newName, end: newDueDate, isEditing: !task.isEditing } : task
    ));
  };

  // return UI component of folder
  return (
    <div className="Folder">
      <h1>{props.name}</h1>
      <FontAwesomeIcon className="edit-icon" icon={faPlus} onClick={() => toggleIsAdding()} />
      {isAdding ? (
        <TaskAdder addTask={addTask} />
      ) : (
        <></>
      )}
      
      {tasks.map((task) =>
        task.isEditing ? (
          <TaskEditor editTask={editTodo} todo={task} />
        ) : (
          <Task
            key={task.id}
            todo={task}
            deleteTask={deleteTask}
            editTask={editTask}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};
