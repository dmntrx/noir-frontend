import { useState } from "react";
import './TaskForm.css';

export default function TaskForm({ onAdd }) {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmedTitle = title.trim(); // убираем пробелы в начале и конце

        if (!trimmedTitle) {
            return; // ничего не происходит при пустой строке
        }

        onAdd(trimmedTitle); // вызываем переданную функцию
        // onAdd(title.charAt(0).toUpperCase() + title.slice(1))
        // делаем первую букву заглавной
        setTitle(''); // очищаем поле
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className='add-task'>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New task" />
                <button type='submit'>Add</button>
            </form>
        </div>
    )
}