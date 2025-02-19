import { useState } from "react";
import Navbar from "./components/navbar";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const handleEdit = () => {};
  const handledelete = () => {};
  const handleadd = () => {
    settodos([...todos, { todo, isCompleted: false }]);
    settodo("");
  };

  const handlechange = (e) => {
    settodo(e.target.value);
  };
  return (
    <>
      <Navbar />
      <div className="bg-slate-500 mx-auto max-w-[1400px] my-6 p-4 rounded-xl text-white  min-h-[70vh]  ">
        <div className="addtodo text-white text-xl font-bold mb-7  ">
          <h2>Add a todo</h2>
          <input
            onChange={handlechange}
            value={todo}
            className="rounded-md w-5/12 text-black"
            type="text"
          />
          <button
            onClick={handleadd}
            className="bg-gray-600 py-1 p-2 mx-5  text-small
           rounded-lg font-bold hover:bg-gray-700 "
          >
            Add
          </button>
        </div>
        <h1 className="text-white text-xl font-bold ">Your Todos</h1>
        {todos.map((item) => {
          return (
            <div className="todo flex my-3 justify-between w-2/4">
              <input type="checkbox" value={item.isCompleted} />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              <div className="buttons">
                <button
                  onClick={handleEdit}
                  className="bg-gray-600 py-1 p-2 mx-5 rounded-lg font-bold hover:bg-gray-700 "
                >
                  Edit
                </button>
                <button
                  onClick={handledelete}
                  className="bg-gray-600 py-1 p-2 mx-5 rounded-lg font-bold hover:bg-gray-700 "
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
