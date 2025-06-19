import TaskModal from '../components/TaskModal';
import TaskList from '../components/TaskList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../api.js';

export default function Today() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem('token');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    API.get('/tasks/', {
    headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
    console.log("Loaded tasks:", res.data); 

    if (!Array.isArray(res.data)) {
      console.error("Expected array, got:", res.data);
      setTasks([]);
    } else {
      setTasks(res.data);
    }
  }).catch((err) => console.error(err));
}, []);

  const addTask = async (title, priority = 2, parent_task_id = null) => {
    const newTask = {
      title,
      description: '',
      date: new Date().toISOString().split('T')[0],
      priority,
      parent_task_id,
    };
    console.log('Sending token:', token);
    const res = await API.post('/tasks/', newTask, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log("Response from server:", res);
    console.log("Response data:", res.data);

    if (!res.data || typeof res.data !== "object") {
    console.error("Invalid response format:", res.data);
    return;
}

    setTasks([...tasks, res.data]);
  };

  const toggleTask = async (id, completed) => {
    await API.put(`/tasks/${id}`, { completed }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const updated = tasks.map(task =>
      task.id === id ? { ...task, completed } : task
    );
    setTasks(updated);
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(tasks.filter(task => task.id !== id));
  };

  const today = new Date().toLocaleDateString('en-EN', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const priorities = {
    1: 'A-Priority',
    2: 'B-Priority',
    3: 'C-Priority',
  };

  return (
    <>
      <h1>TODAY — {today}</h1>
      <button onClick={() => setIsModalOpen(true)}>Add Task</button>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addTask}
        tasks={tasks}
      />

      {[1, 2, 3].map(priority => {
        const allTasksArray = Array.isArray(tasks) ? tasks : [];
        const topLevelTasks = allTasksArray.filter(
        task => task.priority === priority && !task.parent_task_id
        );
        return (
          <div key={priority}>
            <h2>{priorities[priority]}</h2>
            <TaskList
              tasks={topLevelTasks}
              allTasks={tasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          </div>
        );
      })}
    </>
  );
}
