import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(() => {
    // ✅ Load todos from localStorage on page load
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [showfinished, setShowFinished] = useState(true);

  // ✅ Save todos to localStorage whenever `todos` changes (even if empty)
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ✅ Add a new todo
  const handleAdd = () => {
    if (todo.trim() === "") return;
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo("");
  };

  // ✅ Delete a todo
  const handleDelete = (id) => {
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
  };

  // ✅ Edit a todo
  const handleEdit = (id) => {
    const itemToEdit = todos.find((item) => item.id === id);
    if (!itemToEdit) return;

    setTodo(itemToEdit.todo);
    setTodos(todos.filter((item) => item.id !== id));
  };

  // ✅ Toggle todo completion
  const handleCheckbox = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  // ✅ Toggle visibility of finished todos
  const toggleFinish = () => {
    setShowFinished((prev) => !prev);
  };

  return (
    <>
      <Navbar />
      <div className="bg-slate-500 mx-auto max-w-[800px] my-6 p-6 rounded-xl text-white min-h-[80vh]">
        <div className="text-3xl text-center font-bold mb-5">
          iTask - Manage your Todos at One Place
        </div>

        {/* ✅ Add a new Todo */}
        <div className="addtodo text-white text-xl font-bold mb-7">
          <h2>Add a todo</h2>
          <div className="flex gap-3">
            <input
              onChange={(e) => setTodo(e.target.value)}
              value={todo}
              className="rounded-md w-3/4 text-black p-2"
              type="text"
              placeholder="Enter your task..."
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-gray-600 py-2 px-4 rounded-lg disabled:bg-gray-400 font-bold hover:bg-gray-700"
            >
              Add
            </button>
          </div>
        </div>

        {/* ✅ Show Finished Todos Checkbox */}
        <div className="mb-4 flex items-center gap-2">
          <input type="checkbox" checked={showfinished} onChange={toggleFinish} />
          <label>Your Finished Todos</label>
        </div>

        <div className="h-[1.4px] w-[90%] mb-4 mx-auto opacity-60 bg-slate-800"></div>

        {/* ✅ Show Todos */}
        <h1 className="text-white text-xl font-bold">Your Todos</h1>

        {todos.length === 0 ? (
          <p className="text-white text-lg italic my-4">No Todos Yet</p>
        ) : (
          todos
            .filter((item) => showfinished || !item.isCompleted) // ✅ Hide finished todos when unchecked
            .map((item) => (
              <div
                key={item.id}
                className="todo flex items-center justify-between bg-gray-700 p-3 rounded-lg my-2"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={item.isCompleted}
                    onChange={() => handleCheckbox(item.id)}
                    className="w-5 h-5"
                  />
                  <span
                    className={`text-lg ${
                      item.isCompleted ? "line-through text-gray-400" : "text-white"
                    }`}
                  >
                    {item.todo}
                  </span>
                </div>
                <div className="buttons flex gap-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-blue-600 py-1 px-3 rounded-lg font-bold hover:bg-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 py-1 px-3 rounded-lg font-bold hover:bg-red-700"
                  >
                    <MdDeleteSweep />
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
