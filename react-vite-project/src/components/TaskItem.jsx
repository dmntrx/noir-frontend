import React from 'react';
import './TaskItem.css';

export default function TaskItem({ task, onToggle, onDelete }) {
    return (
        <ul>
            <li className='task-item'>
                <input
                type="checkbox"
                checked={task.completed}
                onChange={ () => onToggle(task.id) } 
                />
                <span className={task.completed ? 'line-through' : ''}>
                    {task.title}
                </span>
                <button onClick={ () => onDelete(task.id)}>Delete</button>
            </li>
        </ul>
    )
}