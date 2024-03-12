import React, { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");

  const handleChange = e => {
    setInputText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (inputText.trim() !== "") {
      setTodos([...todos, inputText]);
      setInputText("");
    }
  };

  return (
    <div className="todo-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={handleChange}
          placeholder="Enter your priority Task"
        />
        <button type="submit">Add Task</button>
      </form>
      <ol className="todo-list">
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ol>
    </div>
  );
};

export default TodoList;

