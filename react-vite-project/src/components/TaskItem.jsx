import React from 'react';
import './TaskItem.css';

export default function TaskItem({ task, onToggle, onDelete }) {
    const handleToggle = () => {
    onToggle(task.id, !task.completed);
    };

    return (
        <ul>
            <li className='task-item'>
                <input
                type="checkbox"
                checked={task.completed}
                onChange={handleToggle} 
                />
                <span className={task.completed ? 'line-through' : ''}>
                    {task.title}
                </span>
                <button onClick={() => onEdit(task)}>Edit</button>
                <button onClick={ () => onDelete(task.id)}>Delete</button>
            </li>
        </ul>
    )
}