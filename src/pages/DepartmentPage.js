import { useEffect, useState } from "react";
import { fetchAll, createEntity } from "../api";

export default function DepartmentPage() {
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({ name: "", intake: "", hod: "" });
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      const data = await fetchAll("departments");
      setDepartments(Array.isArray(data) ? data : []);
    } catch (err) { setError("Failed to load departments"); }
  };

  useEffect(() => { loadData(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEntity("departments", { ...form, intake: Number(form.intake) });
      setForm({ name: "", intake: "", hod: "" });
      loadData();
    } catch (err) { setError(err.response?.data?.message || "Failed to create department"); }
  };

  return (
    <div>
      <h2>Departments</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="intake" value={form.intake} onChange={handleChange} placeholder="Intake" />
        <input name="hod" value={form.hod} onChange={handleChange} placeholder="HOD" />
        <button type="submit">Add Department</button>
      </form>
      <table border="1">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Intake</th><th>HOD</th></tr>
        </thead>
        <tbody>
          {departments.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.intake}</td>
              <td>{d.hod}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}