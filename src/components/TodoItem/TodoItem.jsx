import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import {
  FaCheckCircle,
  FaHourglassHalf,
  FaRegWindowClose,
} from "react-icons/fa";
import cx from "classnames";
import "./TodoItem.css";
import { deleteTodo, updateTodo } from "../../store/reducers/todos";

export default function TodoItem({ todo, index, onDragStart, onDrop }) {
  let { id, title, text, state } = todo;
  const dispatch = useDispatch();
  // TODO: call useDispatch here to get access to dispatch function

  if (index === 0) {
    state = "in progress";
  }

  if (index === todo.length - 1) {
    state = "new";
  }

  if (index > 0 && index < todo.length - 1) {
    state = "pending";
  }

  const onDeleteClick = () => {
    // TODO: Dispacth corresponding action
    dispatch(deleteTodo(id));
  };

  const onDoneClick = (todos) => {
    // TODO: Dispacth corresponding action
    let newState =
      state === "in progress" || state === "pending" ? "done" : "in progress";
    state = newState;
    let newTodos = { ...todos, state: newState };
    dispatch(updateTodo(newTodos));
  };

  const onInProgressClick = (todos) => {
    // TODO: Dispacth corresponding action
    let newState =
      state === "done" || state === "pending" ? "in progress" : "pending";
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

  //=========================  EXTRA SECTION : Development Phase ===================================
  const itemRef = useRef(null);

  const on1DragStart = (e) => {
    e.dataTransfer.effectedAllowed = "move";
    e.dataTransfer.setDragImage(e.target, 50000, 50000);

    // custom drag ghost
    let p = document.getElementById(todo.id);
    let ghostNode = p.cloneNode(true);

    ghostNode.style.position = "absolute";

    // show ghost add mouse pointer position
    ghostNode.style.top = e.pageY - e.target.offsetHeight / 2 + "px";
    ghostNode.style.left = e.pageX - e.target.offsetWidth / 2 + "px";

    // add width height to ghost node
    ghostNode.style.height = e.target.offsetHeight + "px";
    ghostNode.style.width = e.target.offsetWidth + "px";

    // add some style
    ghostNode.style.opacity = "0.8";
    ghostNode.style.pointerEvents = "none";

    // add id
    // ghostNode.id = "ghostNode";
    document.body.prepend(ghostNode);

    // identify selected item
    itemRef.current.classList.add("dragstart");
    if (onDragStart) {
      onDragStart(index);
    }
  };

  // event when dragging
  const onDrag = (e) => {
    // move ghost node with mouse
    let ghostNode = document.getElementById(todo.id);
    ghostNode.style.top = e.pageY - e.target.offsetHeight / 2 + "px";
    ghostNode.style.left = e.pageX - e.target.offsetWidth / 2 + "px";
  };

  // event when drag end
  const onDragEnd = () => {
    // remove ghost node
    document.getElementById(todo.id).remove();
    // remove selected item style
    itemRef.current.classList.remove("dragstart");
  };

  // event when drag over item
  const onDragEnter = () => itemRef.current.classList.add("dragover");

  // event when drag leave item
  const onDragLeave = () => itemRef.current.classList.remove("dragover");

  // add event for item can drop
  const onDragOver = (e) => e.preventDefault();

  // event when drop
  const on1Drop = () => {
    itemRef.current.classList.remove("dragover");
    onDrop(index);
  };

  return (
    <>
      <div
        id={todo.id}
        className="todo-item-container draggable-list__item"
        ref={itemRef}
        draggable={true}
        onDragStart={on1DragStart}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={on1Drop}
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
