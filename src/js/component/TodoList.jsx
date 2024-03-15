import React, { useState, useEffect } from "react";
import ToRoman from "./ToRoman";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faArrowAltCircleDown,
  faArrowAltCircleUp,
} from "@fortawesome/free-solid-svg-icons";

const TodoList = () => {
  const tasksPerPage = 10;
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [romanNumeralsLeft, setRomanNumeralsLeft] = useState([]);
  const [romanNumeralsRight, setRomanNumeralsRight] = useState([]);
  const [displayedLeftTasks, setDisplayedLeftTasks] = useState([]);
  const [displayedRightTasks, setDisplayedRightTasks] = useState([]);

  useEffect(() => {
    updateRomanNumerals();
    updateDisplayedTasks();
  }, [currentPage, todos]);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() !== "") {
      setTodos([...todos, inputText]);
      setInputText("");

      // Check if adding a new task exceeds tasks per page limit
      if (todos.length + 1 > currentPage * tasksPerPage) {
        nextPage(); // Move to the next page
      } else {
        // Update the displayed tasks after adding a new task
        updateDisplayedTasks();
      }
    }
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const updateRomanNumerals = () => {
    const startNumber = (currentPage - 1) * tasksPerPage + 1;
    const leftNumbers = [];
    const rightNumbers = [];
    for (let i = startNumber; i < startNumber + tasksPerPage; i++) {
      if (i % 2 === 1) {
        leftNumbers.push(i);
      } else {
        rightNumbers.push(i);
      }
    }
    setRomanNumeralsLeft(leftNumbers);
    setRomanNumeralsRight(rightNumbers);
  };

  const updateDisplayedTasks = () => {
    const startIndex = (currentPage - 1) * tasksPerPage;
    const endIndex = Math.min(currentPage * tasksPerPage, todos.length);
    const displayedTasks = todos.slice(startIndex, endIndex);
    setDisplayedLeftTasks(displayedTasks.filter((_, index) => index % 2 === 0));
    setDisplayedRightTasks(
      displayedTasks.filter((_, index) => index % 2 === 1)
    );
  };

  const clearAll = () => {
    setTodos([]);
    setCurrentPage(1); 
  };

  return (
    
    <div className="todo-container">
      
      <h1 className="title">Task List</h1>
      {todos.length == 0 && <div style={{marginLeft: "42%",color: "red"}}><b>No Tasks Displayed</b></div>}
      <div className="row">
        <div className="col-md-6 d-flex">
          <div className="roman-numbers-left">
            {romanNumeralsLeft.map((number, index) => (
              <div key={index}>
                <ToRoman number={number} />
              </div>
            ))}
          </div>
          <div className="todo-list-left">
            {displayedLeftTasks.map((task, index) => (
              <div className="d-flex" key={index}>
                <li>{task}</li>
                <FontAwesomeIcon
                  icon={faTrash}
                  className="trash-icon"
                  onClick={() =>
                    handleDelete((currentPage - 1) * tasksPerPage + index * 2)
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6 d-flex">
          <div className="roman-numbers-right">
            {romanNumeralsRight.map((number, index) => (
              <div key={index}>
                <ToRoman number={number} />
              </div>
            ))}
          </div>
          <div className="todo-list-right">
            {displayedRightTasks.map((task, index) => (
              <div className="d-flex" key={index}>
                <li>{task}</li>
                <FontAwesomeIcon
                  icon={faTrash}
                  className="trash-icon"
                  onClick={() =>
                    handleDelete(
                      (currentPage - 1) * tasksPerPage + index * 2 + 1
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <div className="row">
        <div className="col-md-12 d-flex justify-content-center">
          <FontAwesomeIcon icon={faArrowAltCircleUp} onClick={prevPage} className="mx-1" style={{cursor: "pointer", color:"brown"}}/>
          <FontAwesomeIcon icon={faArrowAltCircleDown} onClick={nextPage} style={{cursor: "pointer", color:"brown"}}/>
        </div>
      </div>
      </div>

      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={handleChange}
          placeholder="Enter your Task (max. 29 characters)"
        />
        
      </form>
    </div>
  );
};

export default TodoList;
