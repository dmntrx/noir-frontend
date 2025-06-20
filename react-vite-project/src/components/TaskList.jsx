import TaskItem from "./TaskItem";
import React from "react";

export default function TaskList({ tasks = [], allTasks = [], onToggle, onDelete, onEdit }) {
    console.log("TaskList received tasks:", tasks);
    console.log("TaskList received allTasks:", allTasks);

    if (!Array.isArray(tasks)) {
        console.error('Error: tasks is not an array!', tasks);
        tasks = [];
    }

    if (!Array.isArray(allTasks)) {
        console.error('Error: allTasks is not an array!', allTasks);
        allTasks = [];
    }

    const sortedTasks = [...tasks].sort((a, b) => {
        if (a.priority !== b.priority) {
            return a.priority - b.priority; // сначала по приоритету (1, 2, 3)
        }
        if (a.is_completed === b.is_completed) {
            return 0;
        }
        return a.is_completed ? 1 : -1; // выполненные ниже
        });

  return (
    <ul>
      {sortedTasks.map((task) => (
        <li key={task.id}>
          <TaskItem task={task} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
          <ul style={{ marginLeft: '1rem' }}>
            {allTasks
                .filter((t) => t.parent_task_id === task.id)
                .sort((a, b) => {
                    if (a.is_completed === b.is_completed) return 0;
                    return a.is_completed ? 1 : -1;
                })
                .map((subtask) => (
                    <li key={subtask.id}>
                    <TaskItem task={subtask} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
                    </li>
                ))}

          </ul>
        </li>
      ))}
    </ul>
  );
}