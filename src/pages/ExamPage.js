import { useEffect, useState } from "react";
import { fetchAll, createEntity } from "../api";

export default function ExamPage() {
  const [exams, setExams] = useState([]);
  const [form, setForm] = useState({ name: "", date: "", type: "", totalMarks: "" });
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      const data = await fetchAll("exams");
      setExams(Array.isArray(data) ? data : []);
    } catch (err) { setError("Failed to load exams"); }
  };

  useEffect(() => { loadData(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEntity("exams", { ...form, totalMarks: Number(form.totalMarks) });
      setForm({ name: "", date: "", type: "", totalMarks: "" });
      loadData();
    } catch (err) { setError(err.response?.data?.message || "Failed to create exam"); }
  };

  return (
    <div>
      <h2>Exams</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input type="date" name="date" value={form.date} onChange={handleChange} />
        <input name="type" value={form.type} onChange={handleChange} placeholder="Type" />
        <input name="totalMarks" value={form.totalMarks} onChange={handleChange} placeholder="Total Marks" />
        <button type="submit">Add Exam</button>
      </form>
      <table border="1">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Date</th><th>Type</th><th>Total Marks</th></tr>
        </thead>
        <tbody>
          {exams.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.name}</td>
              <td>{e.date}</td>
              <td>{e.type}</td>
              <td>{e.totalMarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}