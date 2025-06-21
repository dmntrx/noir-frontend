import { useEffect, useState } from "react";
import API from "../api.js";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const statusOptions = ["pending", "in_progress", "closed"];

export default function Requests() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/support/all");
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/support/${id}`, { status });
      fetchRequests(); // обновим список
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(requests);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Requests");
    // добавляет лист в книгу с именем "Requests"
    const blob = new Blob([XLSX.write(workbook, { bookType: "xlsx", type: "array" })]);
    // генерирует бинарные данные Excel-файла в формате .xlsx
    saveAs(blob, "support_requests.xlsx");
    // сохраняет файл на диск пользователя (с помощью либы file-saver)
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      <h1>ADMIN REQUESTS PAGE</h1>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Message</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.username}</td>
              <td>{r.message}</td>
              <td>
                <select
                  value={r.status}
                  onChange={(e) => updateStatus(r.id, e.target.value)}>
                  {statusOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </td>
              <td>{new Date(r.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={exportToExcel}>
        Export to Excel
      </button>
    </div>
  );
}
