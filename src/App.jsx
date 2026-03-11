import { useState } from "react";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input.trim(), done: false }]);
    setInput("");
  };

  const toggleTask = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const deleteTask = (id) =>
    setTasks(tasks.filter((t) => t.id !== id));

  // Funciones para Editar
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, text: editText } : t)));
    setEditingId(null);
  };

  const completedCount = tasks.filter(t => t.done).length;

  return (
    <div className="app">
      <h1>Tareas web app</h1>
      <p className="stats">Completadas: {completedCount} de {tasks.length}</p>

      <div className="input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Ingresa una nueva tarea..."
        />
        <button className="btn-add" onClick={addTask}>Agregar</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.done ? "done" : ""}>
            <div className="task-content">
              <input 
                type="checkbox" 
                checked={task.done} 
                onChange={() => toggleTask(task.id)} 
              />
              
              {editingId === task.id ? (
                <input
                  className="edit-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={() => saveEdit(task.id)}
                  onKeyDown={(e) => e.key === "Enter" && saveEdit(task.id)}
                  autoFocus
                />
              ) : (
                <span onClick={() => toggleTask(task.id)}>{task.text}</span>
              )}
            </div>

            <div className="actions">
              <button className="btn-edit" onClick={() => startEdit(task)}>✎</button>
              <button className="btn-delete" onClick={() => deleteTask(task.id)}>✕</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}