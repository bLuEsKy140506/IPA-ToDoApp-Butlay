import "./App.css";
import { TodoList, NewTodoForm } from "./components";

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>ToDo List Application</h1>
        <br />
        {/* <h3>
          This IPA was modified to draggable tasks items and have a FOCUS TASKS
          item features
        </h3>
        <br /> */}
        <h2>SOLVING IPA-5</h2>
        <NewTodoForm className="plus" />
      </div>
      <hr style={{ marginBottom: "5px" }} />
      <div className="container">
        <h4>
          To replace the FOCUS TASK just drag the card to the FOCUS task
          top-border until the green color appears
        </h4>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
