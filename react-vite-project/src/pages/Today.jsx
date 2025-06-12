import { useState } from "react";
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Today() {
    // хук (функция использующая состояние) состояния useState
    // [состояние, функцияДляИзменения] = [начальноеЗначение]
    const [tasks, setTasks] = useState([]);

    // стрелочная функция - удобнее синтаксис
    // создаем задачу
    const addTask = (title) => {
        // создание объекта новой задачи
        const newTask = {
            id: Date.now(),
            title,
            completed: false,
        };
        // ... оператор spread копирует все задачи, создаем новый массив с newTask в конце
        // setTasks обновляет состояние tasks в новом массиве
        setTasks([...tasks, newTask]);
    };

    // изменение статуса задачи - completed: true/false иначе возвращаем неизмененной
    // вычеркивание
    const toggleTask = (id) => {
        setTasks(
            tasks.map((task) =>
            task.id === id ? {...task, completed: !task.completed} : task
            )
        );
    };

    // удаление задачи
    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    // отображение текущей даты
    const today = new Date().toLocaleDateString('en-EN', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });

      
    return (
        <>
        <h1>TODAY - {today}</h1>
        {/* props - передача в дочерний элемент TaskForm */}
        <TaskForm onAdd={addTask} />
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
        </>
    )
}