import { useState, useEffect } from 'react';
import "./TaskModal.css";
import API from '../api';

export default function TaskModal({ isOpen, onClose, onAdd, onUpdate, task, tasks }) {
  const token = localStorage.getItem('token');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subtaskTitle, setSubtaskTitle] = useState('');

  const [priority, setPriority] = useState(2);

  useEffect(() => {
    if (task) {
        setTitle(task.title);
        setDescription(task.description || '');
        setPriority(task.priority || 2);
    } else {
        setTitle('');
        setDescription('');
        setPriority(2); // по умолчанию B
    }
  }, [task]);
  
  const handleSave = async () => {
    if (task) {
        const updatedTask = {
        title,
        description: task.description || "",
        date: task.date,
        priority: task.priority,
        is_completed: task.is_completed,
        parent_task_id: task.parent_task_id || null
        };

        const res = await API.put(`/tasks/${task.id}`, updatedTask);
        onUpdate(res.data);
    } else {
        onAdd(title, priority);
    }
    onClose();
};


  const handleAddSubtask = async () => {
    const res = await API.post(`/tasks/`, {
      title: subtaskTitle,
      description: '',
      date: new Date().toISOString().split('T')[0],
      priority: 2,
      parent_task_id: task.id
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    onUpdate(res.data); // обновим родительский список
    setSubtaskTitle('');
  };

  const handleDelete = async (id) => {
    await API.delete(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    onUpdate({ deleted: id });

    if (task?.id === id) {
        onClose();
    }
  };

  if (!isOpen) return null;

  const subtasks = tasks.filter(t => t.parent_task_id === (task?.id || -1));

  return (
    <div className="modal-overlay">
        <div className="modal">
            <h2>{task ? 'Edit Task' : 'Add Task'}</h2>
            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Task title"
            />
            {/* <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Description"
            /> */}

            {!task?.parent_task_id && (
              <>
                <label>Priority:</label>
                <select value={priority} onChange={e => setPriority(Number(e.target.value))}>
                  <option value={1}>A - Priority</option>
                  <option value={2}>B - Priority</option>
                  <option value={3}>C - Priority</option>
                </select>
              </>
            )}

            

            {task && !task.parent_task_id && (
                <>
                <h3>Subtasks</h3>
                <ul className='ul-subtasks'>
                    {subtasks.map(subtask => (
                    <li className='li-subtasks' key={subtask.id}>
                        {subtask.title}
                        <button onClick={() => handleDelete(subtask.id)}>Delete</button>
                    </li>
                    ))}
                </ul>

                <input
                    value={subtaskTitle}
                    onChange={e => setSubtaskTitle(e.target.value)}
                    placeholder="New subtask title"
                />
                <button className='subtask-button' onClick={handleAddSubtask}>Add Subtask</button>
                </>
            )}

            
            <div className='modal-button'>
                <button onClick={handleSave}>{task ? 'Save Changes' : 'Create Task'}</button>
                {task && <button className='delete-button' onClick={() => handleDelete(task.id)}>Delete Task</button>}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    </div>
  );
}
