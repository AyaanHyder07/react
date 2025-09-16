import { useEffect, useState } from "react";
import { fetchAll, createEntity, deleteEntity } from "../services/apiService";

export default function DepartmentPage() {
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({ name: "", intake: "", hod: "" });
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setError(null);
      const response = await fetchAll("departments");
      setDepartments(Array.isArray(response.data) ? response.data : []);
    } catch (err) { setError("Failed to load departments"); }
  };

  useEffect(() => { loadData(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      
      const response = await createEntity("departments", { ...form, intake: Number(form.intake) });
      const newDepartment = response.data; 

      setDepartments(currentDepartments => [...currentDepartments, newDepartment]);
      setForm({ name: "", intake: "", hod: "" });
    } catch (err) { setError(err.response?.data?.message || "Failed to create department"); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        setError(null);
        await deleteEntity("departments", id);
        setDepartments(currentDepartments => currentDepartments.filter(d => d.id !== id));
      } catch (err) { setError(err.response?.data?.message || "Failed to delete department"); }
    }
  };

  return (
    <div>
      <h3>Departments</h3>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="intake" type="number" value={form.intake} onChange={handleChange} placeholder="Intake" required />
        <input name="hod" value={form.hod} onChange={handleChange} placeholder="HOD" required />
        <button type="submit">Add Department</button>
      </form>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Intake</th><th>HOD</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {departments.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td><td>{d.name}</td><td>{d.intake}</td><td>{d.hod}</td>
              <td><button onClick={() => handleDelete(d.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}