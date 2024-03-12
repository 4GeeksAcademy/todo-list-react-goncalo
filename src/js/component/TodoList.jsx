import React, { useState } from "react";
import Document from "./Document";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() !== "") {
      setTodos([...todos, inputText]);
      setInputText("");
    }
  };

  return (
    <div className="todo-container">
      <h1 className="title">Task List</h1>
      <Document />
      <ol className="todo-list">
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ol>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={handleChange}
          placeholder="Enter your priority Task"
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TodoList;
