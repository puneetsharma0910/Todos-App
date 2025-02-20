import { useState } from "react";
import Navbar from "./components/navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);

  const handleEdit = (id) => {
    console.log("Editing todo with id:", id);
  };

  const handledelete = (e, id) => {
    settodos(todos.filter((item) => item.id !== id));
  };

  const handleadd = () => {
    if (todo.trim() === "") return; // Prevent empty todos
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
  };

  const handlechange = (e) => {
    settodo(e.target.value);
  };

  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => item.id === id);

    if (index !== -1) {
      let newtodos = [...todos]; // Create a new array copy
      newtodos[index].isCompleted = !newtodos[index].isCompleted;
      settodos(newtodos);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-slate-500 mx-auto max-w-[1400px] my-6 p-4 rounded-xl text-white min-h-[70vh]">
        <div className="addtodo text-white text-xl font-bold mb-7">
          <h2>Add a todo</h2>
          <input
            onChange={handlechange}
            value={todo}
            className="rounded-md w-5/12 text-black"
            type="text"
          />
          <button
            onClick={handleadd}
            className="bg-gray-600 py-1 p-2 mx-5 text-small rounded-lg font-bold hover:bg-gray-700"
          >
            Add
          </button>
        </div>
        <h1 className="text-white text-xl font-bold">Your Todos</h1>

        {todos.length == 0 ? (
          <p className="text-white text-lg  my-4">No todos to Display</p>
        ) : (
          todos.map((item) => (
            <div
              key={item.id}
              id={item.id}
              className="todo flex my-3 justify-between w-2/4"
            >
              <input
                name={item.id}
                onChange={handlecheckbox}
                type="checkbox"
                checked={item.isCompleted}
              />
              <div className={item.isCompleted ? "line-through" : ""}>
                {item.todo}
              </div>
              <div className="buttons">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="bg-gray-600 py-1 p-2 mx-5 rounded-lg font-bold hover:bg-gray-700"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => handledelete(e, item.id)}
                  className="bg-gray-600 py-1 p-2 mx-5 rounded-lg font-bold hover:bg-gray-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default App;
