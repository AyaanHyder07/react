import { useEffect, useState } from "react";
import { fetchAll, createEntity } from "../api";

export default function SubjectPage() {
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({ code: "", name: "", credits: "", duration: "" });
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      const data = await fetchAll("subjects");
      setSubjects(Array.isArray(data) ? data : []);
    } catch (err) { setError("Failed to load subjects"); }
  };

  useEffect(() => { loadData(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEntity("subjects", { ...form, credits: Number(form.credits), duration: Number(form.duration) });
      setForm({ code: "", name: "", credits: "", duration: "" });
      loadData();
    } catch (err) { setError(err.response?.data?.message || "Failed to create subject"); }
  };

  return (
    <div>
      <h2>Subjects</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input name="code" value={form.code} onChange={handleChange} placeholder="Code" />
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="credits" value={form.credits} onChange={handleChange} placeholder="Credits" />
        <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duration" />
        <button type="submit">Add Subject</button>
      </form>
      <table border="1">
        <thead>
          <tr><th>ID</th><th>Code</th><th>Name</th><th>Credits</th><th>Duration</th></tr>
        </thead>
        <tbody>
          {subjects.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.code}</td>
              <td>{s.name}</td>
              <td>{s.credits}</td>
              <td>{s.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}