import { useEffect, useState } from "react";
import { fetchAll, createEntity, deleteEntity } from "../services/apiService";

export default function SemesterPage() {
  const [semesters, setSemesters] = useState([]);
  const [form, setForm] = useState({ sno: "", stage: "", endYear: "" });
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setError(null);
      const response = await fetchAll("semesters");
      setSemesters(Array.isArray(response.data) ? response.data : []);
    } catch (err) { setError("Failed to load semesters"); }
  };

  useEffect(() => { loadData(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      
      const response = await createEntity("semesters", { ...form, endYear: Number(form.endYear) });
      const newSemester = response.data;

      setSemesters(currentSemesters => [...currentSemesters, newSemester]);
      setForm({ sno: "", stage: "", endYear: "" });
    } catch (err) { setError(err.response?.data?.message || "Failed to create semester"); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this semester?")) {
      try {
        setError(null);
        await deleteEntity("semesters", id);
        setSemesters(currentSemesters => currentSemesters.filter(s => s.id !== id));
      } catch (err) { setError(err.response?.data?.message || "Failed to delete semester"); }
    }
  };

  return (
    <div>
      <h3>Semesters</h3>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input name="sno" value={form.sno} onChange={handleChange} placeholder="S.No" required />
        <input name="stage" value={form.stage} onChange={handleChange} placeholder="Stage" required />
        <input name="endYear" type="number" value={form.endYear} onChange={handleChange} placeholder="End Year" required />
        <button type="submit">Add Semester</button>
      </form>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr><th>ID</th><th>S.No</th><th>Stage</th><th>End Year</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {semesters.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td><td>{s.sno}</td><td>{s.stage}</td><td>{s.endYear}</td>
              <td><button onClick={() => handleDelete(s.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}