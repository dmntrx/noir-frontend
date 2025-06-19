import { useState } from "react";
import "./TaskModal.css";

export default function TaskModal({ isOpen, onClose, onAdd, tasks }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(2);
  const [parentId, setParentId] = useState(null);

  const handleSubmit = (e) => {
  e.preventDefault();
  onAdd(title, priority, parentId);
  setTitle("");
  setPriority(null);
  setParentId(null);
  onClose();
};

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Task title"
            required
          />

          <label>
            Priority:
            <select value={priority} onChange={e => setPriority(Number(e.target.value))}>
              <option value={1}>A-priority</option>
              <option value={2}>B-priority</option>
              <option value={3}>C-priority</option>
            </select>
          </label>

          <label>
            Parent Task:
            <select
              value={parentId || ""}
              onChange={e => setParentId(e.target.value || null)}
            >
              <option value="">None (top-level)</option>
              {tasks.map(task => (
                <option key={task.id} value={task.id}>
                  {task.title}
                </option>
              ))}
            </select>
          </label>

          <div className="modal-buttons">
            <button type="submit">Add</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
