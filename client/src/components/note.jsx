import {Task} from "./task";
import {v4 as uuidv4} from "uuid";
import React, {useState} from "react";
import {TaskAdder} from "./taskAdder";
import {TaskEditor} from "./taskEditor";
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
//import {faPlus} from '@fortawesome/free-solid-svg-icons'
//import {faTrash} from '@fortawesome/free-solid-svg-icons'


export const Note = ({deleteNoteFunc, noteInfo}) => {
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
      <Button onClick={() => toggleIsAdding()} icon={<img src=".././public/todo.svg" alt="icon" style={{ width: '20px', height: '20px' }} />} />
      <h1>{noteInfo.title}</h1>
      <Button onClick={() => deleteNoteFunc(noteInfo.id)} icon={<img src=".././public/foloder_icon.svg" alt="icon" style={{ width: '20px', height: '20px' }} />} />
      {tasks.map((task) =>
        task.isEditing ? (
          <>
            <Task
              key={task.id}
              todo={task}
              editTask={editTask}
              toggleComplete={toggleComplete}
            />
            <TaskEditor editTask={editTodo} todo={task} deleteTaskFunc={deleteTask}/>
          </>
        ) : (
          <Task
            key={task.id}
            todo={task}
            editTask={editTask}
            toggleComplete={toggleComplete}
          />
        )
      )}
      {isAdding ? (
        <TaskAdder addTask={addTask} />
      ) : (
        <></>
      )}
    </div>
  );
};
