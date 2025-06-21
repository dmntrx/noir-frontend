import { useEffect, useState } from "react";
import API from "../api.js";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export default function Users() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users/all");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // удаление пользователя
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await API.delete(`/users/${id}`);
      fetchUsers(); // обновим список
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  // экспорт в файл
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    const blob = new Blob([XLSX.write(workbook, { bookType: "xlsx", type: "array" })]);
    saveAs(blob, "users.xlsx");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>ADMIN USERS PAGE</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Registered</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{new Date(u.created_at).toLocaleString()}</td>
              <td>
                <button onClick={() => deleteUser(u.id)}>🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={exportToExcel}>Export to Excel</button>
    </div>
  );
}
