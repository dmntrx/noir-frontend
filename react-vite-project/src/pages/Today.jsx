import TaskModal from '../components/TaskModal';
import TaskList from '../components/TaskList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../api.js';

export default function Today() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem('token');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);


  useEffect(() => {
  API.get('/tasks/')
    .then((res) => {
      console.log("Loaded tasks:", res.data);

      if (!Array.isArray(res.data)) {
        console.error("Expected array, got:", res.data);
        setTasks([]);
      } else {
        setTasks(res.data);
      }
    })
    .catch((err) => console.error(err));
}, []);

const addTask = async (title, priority = 2, parent_task_id = null) => {
  const newTask = {
    title,
    description: '',
    date: new Date().toISOString().split('T')[0],
    priority,
    parent_task_id,
  };

  const res = await API.post('/tasks/', newTask);
  setTasks([...tasks, res.data]);
};

const toggleTask = async (id, completed) => {
  const taskToUpdate = tasks.find(task => task.id === id);

  if (!taskToUpdate) return;

  const payload = {
    title: taskToUpdate.title,
    description: taskToUpdate.description || "",
    date: taskToUpdate.date,
    priority: taskToUpdate.priority,
    is_completed: completed,
    parent_task_id: taskToUpdate.parent_task_id || null
  };

  await API.put(`/tasks/${id}`, payload);

  const updated = tasks.map(task =>
    task.id === id ? { ...task, is_completed: completed } : task
  );
  setTasks(updated);
};


const deleteTask = async (id) => {
  await API.delete(`/tasks/${id}`);
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
        onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
        }}
        onAdd={addTask}
        onUpdate={(updatedOrDeleted) => {
            if (updatedOrDeleted.deleted) {
            setTasks(tasks.filter(t => t.id !== updatedOrDeleted.deleted));
            } else {
            setTasks(prev => {
                const idx = prev.findIndex(t => t.id === updatedOrDeleted.id);
                if (idx !== -1) {
                const newTasks = [...prev];
                newTasks[idx] = updatedOrDeleted;
                return newTasks;
                }
                return [...prev, updatedOrDeleted]; // подзадача добавлена
            });
            }
        }}
        task={editingTask}
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
                onEdit={(task) => {
                    setEditingTask(task);
                    setIsModalOpen(true);
                }}
                />

          </div>
        );
      })}
    </>
  );
}
