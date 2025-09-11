import { useEffect, useState } from "react";
import { fetchAll, createEntity } from "../api";

export default function AssessmentPage() {
  const [assessments, setAssessments] = useState([]);
  const [form, setForm] = useState({
    number: "",
    date: "",
    marks: "",
    totalMarks: "",
  });
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setAssessments(await fetchAll("assessments"));
    } catch (err) {
      setError("Failed to load assessments");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        number: form.number,
        date: form.date,
        marks: Number(form.marks),
        totalMarks: Number(form.totalMarks),
      };
      await createEntity("assessments", payload);
      setForm({ number: "", date: "", marks: "", totalMarks: "" });
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create assessment");
    }
  };

  return (
    <div>
      <h2>Assessments</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <input name="number" value={form.number} onChange={handleChange} placeholder="Number" />
        <input type="date" name="date" value={form.date} onChange={handleChange} />
        <input name="marks" value={form.marks} onChange={handleChange} placeholder="Marks" />
        <input name="totalMarks" value={form.totalMarks} onChange={handleChange} placeholder="Total Marks" />
        <button type="submit">Add Assessment</button>
      </form>

      <table border="1">
        <thead>
          <tr><th>ID</th><th>No</th><th>Date</th><th>Marks</th><th>Total</th></tr>
        </thead>
        <tbody>
          {assessments.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.number}</td>
              <td>{a.date}</td>
              <td>{a.marks}</td>
              <td>{a.totalMarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
