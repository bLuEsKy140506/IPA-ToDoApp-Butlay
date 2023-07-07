import React from "react";
import { useDispatch } from "react-redux";
import {
  FaCheckCircle,
  FaHourglassHalf,
  FaRegWindowClose,
} from "react-icons/fa";
import cx from "classnames";
import "./TodoItem.css";
import { deleteTodo, updateTodo } from "../../store/reducers/todos";

//replica of todoitem and its primary function is to separate it to the not done items
export default function TodoItemDone({ todo }) {
  let { id, title, text, state } = todo;
  const dispatch = useDispatch();
  // TODO: call useDispatch here to get access to dispatch function

  const onDeleteClick = () => {
    // TODO: Dispacth corresponding action
    dispatch(deleteTodo(id));
  };

  const onDoneClick = (todos) => {
    // TODO: Dispacth corresponding action
    let newState =
      state === "in progress" || state === "new" ? "done" : "in progress";
    state = newState;
    let newTodos = { ...todos, state: newState };
    dispatch(updateTodo(newTodos));
  };

  const onInProgressClick = (todos) => {
    // TODO: Dispacth corresponding action
    let newState = state === "done" || state === "new" ? "in progress" : "new";
    state = newState;
    let newTodos = { ...todos, state: newState };

    dispatch(updateTodo(newTodos));
  };

  const lineThroughTitle = cx("todo-item-header-container", {
    "todo-item-done": state === "done",
  });

  const lineThroughDescription = cx("todo-item-text", {
    "todo-item-done": state === "done",
  });
  const inProgressClassName = cx("todo-mark-in-progress", {
    "in-progress": state === "in progress",
  });

  const doneClassName = cx("todo-mark-done", {
    done: state === "done",
  });

  const statusTag = cx("todo-status", {
    "in-progress-new": state === "new",
    "in-progress-pending": state === "pending",
    "in-progress-done": state === "done",
  });

  return (
    <>
      <div
        id={todo.id}
        className="todo-item-container-done draggable-list__item"
      >
        <div className={lineThroughTitle}>
          <h2 className="todo-item-header">{title}</h2>
          <FaRegWindowClose
            size={20}
            className="todo-item-cross"
            onClick={() => onDeleteClick(todo.id)}
          />
        </div>
        <p className={lineThroughDescription}>{text}</p>
        <div className="todo-status-container">
          <div className={statusTag}>{state}</div>
          <FaHourglassHalf
            size={20}
            className={inProgressClassName}
            onClick={() => onInProgressClick(todo)}
          />
          <FaCheckCircle
            size={20}
            className={doneClassName}
            onClick={() => onDoneClick(todo)}
          />
        </div>
      </div>
    </>
  );
}
