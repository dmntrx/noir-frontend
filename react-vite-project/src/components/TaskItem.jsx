import React from 'react';
import './TaskItem.css';

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
    const handleToggle = () => {
    onToggle(task.id, !task.is_completed);
    };

    return (
        <ul>
            <li className='task-item'>
                <input
                type="checkbox"
                checked={task.is_completed}
                onChange={handleToggle} 
                />
                <span className={task.is_completed ? 'line-through' : ''}>
                    {task.title}
                </span>
                <button onClick={() => onEdit(task)}>Edit</button>
                {/* <button onClick={ () => onDelete(task.id)}>Delete</button> */}
            </li>
        </ul>
    )
}