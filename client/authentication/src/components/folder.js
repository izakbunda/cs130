import React, { useState } from "react";
import { Task } from "./task";
import { TaskAdder } from "./taskAdder";
import { v4 as uuidv4 } from "uuid";
import { TaskEditor } from "./taskEditor";

export const Folder = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([
      ...tasks,
      { id: uuidv4(), todo: task, completed: false, isEditing: false },
    ]);
  }

  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  const editTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  }

  const editTodo = (todo, id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, todo, isEditing: !task.isEditing } : task
      )
    );
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      <TaskAdder addTask={addTask} />
      {/* display tasks */}
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
