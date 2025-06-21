import { useEffect, useState } from "react";
import API from '../api.js';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import dayjs from "dayjs";

const periods = {
  '7 days': 7,
  '1 month': 30,
  '3 months': 90,
  '6 months': 180,
  '1 year': 365
};

export default function Statistics() {
  const [period, setPeriod] = useState('7 days');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchProductivity = async () => {
      const end = dayjs().format('YYYY-MM-DD'); // текущая дата
      const start = dayjs().subtract(periods[period], 'day').format('YYYY-MM-DD'); 
      // дата в прошлом (за период)
      try {
        const res = await API.get(`/statistics/`, {
          params: { start, end } // передаем даты как параметры
        });
        setData(res.data); // сохранение ответа
      } catch (err) {
        console.error(err);
      }
    };

    fetchProductivity();
  }, [period]);

  return (
    <div className="p-4">
      <h1>STATISTICS</h1>

      <select value={period} onChange={e => setPeriod(e.target.value)} className="mb-4">
        {Object.keys(periods).map(label => (
          <option key={label} value={label}>{label}</option>
        ))}
      </select>
      <div style={ {margin: '1rem'} }>
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            {/* сетка по xy */}
            <XAxis dataKey="date" /> 
            <YAxis domain={[0, 100]} />
            <Tooltip /> 
            {/* наведение курсора показывает данные */}
            <Legend />
            {/* обозначение цвета линии */}
            <Line type="monotone" dataKey="productivity" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
