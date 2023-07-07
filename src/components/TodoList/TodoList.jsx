import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos } from "../../store/reducers/todos";
import TodoItem from "../TodoItem/TodoItem";
import TodoItemDone from "../TodoItem/TodoItemDone";
import { add } from "../../store/reducers/todos";

import "./TodoList.css";

export function TodoList() {
  const dispatch = useDispatch();
  // let savedSequence = [];

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);
  const todos = useSelector((state) => state.todos);

  // for (let i of arraySequence) {
  //   arraySequenceObject.push(todos[i]);
  // }

  // console.log(arraySequenceObject);
  // const [data, setdata] = useState([]);

  const [dragStartIndex, setdragStartIndex] = useState(null);

  // get index of draged item
  const onDragStart = (index) => setdragStartIndex(index);

  // update list when item dropped
  const onDrop = (dropIndex) => {
    // dispatch(add([dragStartIndex, dropIndex]));
    // get draged item
    console.log(dragStartIndex, dropIndex);
    const dragItem = todos[dragStartIndex];
    console.log(dragItem);
    // // delete draged item in list
    let list = [...todos];
    list.splice(dragStartIndex, 1);
    let newList;
    // // update list
    if (dragStartIndex < dropIndex) {
      newList = [
        ...list.slice(0, dropIndex - 1),
        dragItem,
        ...list.slice(dropIndex - 1, list.length),
      ];
    } else {
      newList = [
        ...list.slice(0, dropIndex),
        dragItem,
        ...list.slice(dropIndex, list.length),
      ];
    }
    dispatch(add(newList));
    // for (let i of newList) {
    //   savedSequence.push(todos.findIndex((x) => x.id === i.id));
    // }
    // console.log(savedSequence);
  };

  return (
    <>
      <div className="todo-list-container">
        {todos.map(
          (todo, index) =>
            todo.state !== "done" && (
              <TodoItem
                key={`${todo.id}--${todo.text}`}
                todo={todo}
                index={index}
                onDragStart={(index) => onDragStart(index)}
                onDrop={(index) => onDrop(index)}
              />
            )
        )}
      </div>
      <hr />
      <h3>DONE TASKS</h3>
      <h4>
        This item(s) are/is not draggable anymore because it's DONE. Unless you
        click the check icon it will return to draggable section
      </h4>
      <div className="todo-list-container-done">
        {todos.map(
          (todo, index) =>
            todo.state === "done" && (
              <TodoItemDone
                key={`${todo.id}--${todo.text}`}
                todo={todo}
                index={index}
              />
            )
        )}
      </div>
    </>
  );
}
