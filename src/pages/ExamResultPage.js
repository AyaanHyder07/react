import { useEffect, useState } from "react";
import { fetchAll, createEntity, deleteEntity } from "../api";

export default function ExamResultPage() {
  const [examResults, setExamResults] = useState([]);
  const [students, setStudents] = useState([]);
  const [exams, setExams] = useState([]);
  const [form, setForm] = useState({ marks: "", grade: "", examId: "", studentId: "" });
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setError(null);
      const [resultsData, studentsData, examsData] = await Promise.all([
        fetchAll("examresults"), fetchAll("students"), fetchAll("exams"),
      ]);
      setExamResults(Array.isArray(resultsData) ? resultsData : []);
      setStudents(Array.isArray(studentsData) ? studentsData : []);
      setExams(Array.isArray(examsData) ? examsData : []);
    } catch (err) { setError("Failed to load data"); }
  };

  useEffect(() => { loadData(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const payload = { ...form, marks: Number(form.marks), examId: Number(form.examId), studentId: Number(form.studentId) };
      await createEntity("examresults", payload);
      setForm({ marks: "", grade: "", examId: "", studentId: "" });
      loadData();
    } catch (err) { setError(err.response?.data?.message || "Failed to create exam result"); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this exam result?")) {
      try {
        setError(null);
        await deleteEntity("examresults", id);
        loadData();
      } catch (err) { setError(err.response?.data?.message || "Failed to delete exam result"); }
    }
  };

  return (
    <div>
      <h2>Exam Results</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input name="marks" value={form.marks} onChange={handleChange} placeholder="Marks" />
        <input name="grade" value={form.grade} onChange={handleChange} placeholder="Grade" />
        <select name="examId" value={form.examId} onChange={handleChange}>
          <option value="">Select Exam</option>
          {exams.map((e) => (<option key={e.id} value={e.id}>{e.name}</option>))}
        </select>
        <select name="studentId" value={form.studentId} onChange={handleChange}>
          <option value="">Select Student</option>
          {students.map((s) => (<option key={s.id} value={s.id}>{s.name}</option>))}
        </select>
        <button type="submit">Add Exam Result</button>
      </form>
      <table border="1">
        <thead>
          <tr><th>ID</th><th>Marks</th><th>Grade</th><th>Exam</th><th>Student</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {examResults.map((er) => (
            <tr key={er.id}>
              <td>{er.id}</td><td>{er.marks}</td><td>{er.grade}</td><td>{er.examName}</td><td>{er.studentName}</td>
              <td><button onClick={() => handleDelete(er.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}