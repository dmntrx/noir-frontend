import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggle, onDelete }) {
    // сортировка вычеркнутых и не вычеркнутых задач
    const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
    });

    return (
        <ul>
            {sortedTasks.map((task) => (
                <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                />
            ))}
        </ul>
    )
}