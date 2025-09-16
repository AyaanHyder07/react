import { useEffect, useState } from "react";
import { fetchAll, createEntity, deleteEntity } from "../services/apiService";

export default function ExamPage() {
  const [exams, setExams] = useState([]);
  const [form, setForm] = useState({ name: "", date: "", type: "", totalMarks: "" });
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setError(null);
      const response = await fetchAll("exams");
      setExams(Array.isArray(response.data) ? response.data : []);
    } catch (err) { setError("Failed to load exams"); }
  };

  useEffect(() => { loadData(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);

      // ✅ FINAL FIX: Get the 'data' property from the response
      const response = await createEntity("exams", { ...form, totalMarks: Number(form.totalMarks) });
      const newExam = response.data; // This is the new Exam DTO

      setExams(currentExams => [...currentExams, newExam]);
      setForm({ name: "", date: "", type: "", totalMarks: "" });
    } catch (err) { setError(err.response?.data?.message || "Failed to create exam"); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      try {
        setError(null);
        await deleteEntity("exams", id);
        setExams(currentExams => currentExams.filter(e => e.id !== id));
      } catch (err) { setError(err.response?.data?.message || "Failed to delete exam"); }
    }
  };

  return (
    <div>
      <h3>Exams</h3>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input type="date" name="date" value={form.date} onChange={handleChange} />
        <input name="type" value={form.type} onChange={handleChange} placeholder="Type" />
        <input name="totalMarks" type="number" value={form.totalMarks} onChange={handleChange} placeholder="Total Marks" />
        <button type="submit">Add Exam</button>
      </form>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Date</th><th>Type</th><th>Total Marks</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {exams.map((e) => (
            <tr key={e.id}>
              <td>{e.id}</td><td>{e.name}</td><td>{e.date}</td><td>{e.type}</td><td>{e.totalMarks}</td>
              <td><button onClick={() => handleDelete(e.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}