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

  // для переключения между днями
  const [selectedDate, setSelectedDate] = useState(new Date());

  const goToPreviousDay = () => {
  setSelectedDate(prev => {
    // создаем копию, чтобы не мутировать оригинал
    const newDate = new Date(prev);
    newDate.setDate(newDate.getDate() - 1);
    return newDate;
  });
};

  const goToNextDay = () => {
    setSelectedDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };

  // продуктивность по дням
  const [productivity, setProductivity] = useState(0);


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


  // обновление продуктивности (при перелистывании дней и вычеркивании задач)
  useEffect(() => {
  const fetchProductivity = async () => {
    try {
      const res = await API.get('/productivity/', {
        params: {
          date_str: selectedDate.toISOString().split('T')[0]
        }
      });
      setProductivity(res.data.productivity);
    } catch (err) {
      console.error("Failed to fetch productivity", err);
      setProductivity(0);
    }
  };

  fetchProductivity();
}, [selectedDate, tasks]); // пересчитывать при смене дня или задач

const addTask = async (title, priority = 2, date, parent_task_id = null) => {
  const newTask = {
    title,
    description: '',
    date,
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

  // продуктивность
  await API.post('/productivity/update', null, {
    params: {
      date_str: taskToUpdate.date
    }
  });

  const res = await API.get('/productivity/', {
    params: {
      date_str: taskToUpdate.date
    }
  });
  setProductivity(res.data.productivity);  
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
  const formattedDate = selectedDate.toLocaleDateString('en-EN', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });


  const priorities = {
    1: 'A-Priority',
    2: 'B-Priority',
    3: 'C-Priority',
  };

  // фильтрация задач по дате
  const selectedDateString = selectedDate.toISOString().split('T')[0];
  // строку формата "2025-06-19T08:00:00.000Z" берем до Т
  const filteredTasks = tasks.filter(task => task.date === selectedDateString);
  return (
    <>
      {/* <h1>TODAY — {today}</h1> */}
      <h1>{formattedDate === today ? `TODAY — ${formattedDate}` : formattedDate}
        <span style={{ marginLeft: '1rem', fontSize: '0.8em', color: '#555' }}>
          — Productivity: {productivity}%
        </span>
      </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={goToPreviousDay}>←</button>
        <button onClick={goToNextDay}>→</button>
        <button onClick={() => setIsModalOpen(true)}>Add Task</button>
</div>

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
        selectedDate={selectedDate}
        />


      {[1, 2, 3].map(priority => {
        const allTasksArray = Array.isArray(tasks) ? tasks : [];
        // const topLevelTasks = allTasksArray.filter(
        const topLevelTasks = filteredTasks.filter(
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
