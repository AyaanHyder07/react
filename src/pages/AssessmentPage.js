import { useEffect, useState } from "react";
import { fetchAll, createEntity, deleteEntity } from "../services/apiService";

export default function AssessmentPage() {
  const [assessments, setAssessments] = useState([]);
  const [form, setForm] = useState({ number: "", date: "", marks: "", totalMarks: "" });
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setError(null);
      const response = await fetchAll("assessments");
      setAssessments(Array.isArray(response.data) ? response.data : []);
    } catch (err) { setError("Failed to load assessments"); }
  };

  useEffect(() => { loadData(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);

      // ✅ FINAL FIX: Get the 'data' property from the response
      const response = await createEntity("assessments", { ...form, marks: Number(form.marks), totalMarks: Number(form.totalMarks) });
      const newAssessment = response.data; // This is the new Assessment DTO

      setAssessments(currentAssessments => [...currentAssessments, newAssessment]);
      setForm({ number: "", date: "", marks: "", totalMarks: "" });
    } catch (err) { setError(err.response?.data?.message || "Failed to create assessment"); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this assessment?")) {
      try {
        setError(null);
        await deleteEntity("assessments", id);
        setAssessments(currentAssessments => currentAssessments.filter(a => a.id !== id));
      } catch (err) { setError(err.response?.data?.message || "Failed to delete assessment"); }
    }
  };

  return (
    <div>
      <h3>Assessments</h3>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input name="number" value={form.number} onChange={handleChange} placeholder="Number" />
        <input type="date" name="date" value={form.date} onChange={handleChange} />
        <input name="marks" type="number" value={form.marks} onChange={handleChange} placeholder="Marks" />
        <input name="totalMarks" type="number" value={form.totalMarks} onChange={handleChange} placeholder="Total Marks" />
        <button type="submit">Add Assessment</button>
      </form>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr><th>ID</th><th>No</th><th>Date</th><th>Marks</th><th>Total</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {assessments.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td><td>{a.number}</td><td>{a.date}</td><td>{a.marks}</td><td>{a.totalMarks}</td>
              <td><button onClick={() => handleDelete(a.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}