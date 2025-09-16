import { useEffect, useState } from "react";
import { fetchAll, createEntity, deleteEntity } from "../services/apiService";

export default function SubjectPage() {
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({ code: "", name: "", credits: "", duration: "" });
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setError(null);
      const response = await fetchAll("subjects");
      setSubjects(Array.isArray(response.data) ? response.data : []);
    } catch (err) { setError("Failed to load subjects"); }
  };

  useEffect(() => { loadData(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);

      // ✅ FINAL FIX: Get the 'data' property from the response
      const response = await createEntity("subjects", { ...form, credits: Number(form.credits), duration: Number(form.duration) });
      const newSubject = response.data; // This is the new Subject DTO

      setSubjects(currentSubjects => [...currentSubjects, newSubject]);
      setForm({ code: "", name: "", credits: "", duration: "" });
    } catch (err) { setError(err.response?.data?.message || "Failed to create subject"); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      try {
        setError(null);
        await deleteEntity("subjects", id);
        setSubjects(currentSubjects => currentSubjects.filter(s => s.id !== id));
      } catch (err) { setError(err.response?.data?.message || "Failed to delete subject"); }
    }
  };

  return (
    <div>
      <h3>Subjects</h3>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input name="code" value={form.code} onChange={handleChange} placeholder="Code" />
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="credits" type="number" value={form.credits} onChange={handleChange} placeholder="Credits" />
        <input name="duration" type="number" value={form.duration} onChange={handleChange} placeholder="Duration" />
        <button type="submit">Add Subject</button>
      </form>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr><th>ID</th><th>Code</th><th>Name</th><th>Credits</th><th>Duration</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {subjects.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td><td>{s.code}</td><td>{s.name}</td><td>{s.credits}</td><td>{s.duration}</td>
              <td><button onClick={() => handleDelete(s.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}