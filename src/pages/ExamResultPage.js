import { useEffect, useState } from "react";
import { fetchAll, createEntity } from "../api";

export default function ExamResultPage() {
  const [examResults, setExamResults] = useState([]);
  const [students, setStudents] = useState([]);
  const [exams, setExams] = useState([]);
  const [finalResults, setFinalResults] = useState([]);
  const [form, setForm] = useState({
    marks: "",
    grade: "",
    examId: "",
    studentId: "",
    finalResultId: "",
  });
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setExamResults(await fetchAll("examResults"));
      setStudents(await fetchAll("students"));
      setExams(await fetchAll("exams"));
      setFinalResults(await fetchAll("finalResults"));
    } catch (err) {
      setError("Failed to load exam results");
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
        marks: Number(form.marks),
        grade: form.grade,
        exam: { id: Number(form.examId) },
        student: { id: Number(form.studentId) },
        finalResult: { id: Number(form.finalResultId) },
      };
      await createEntity("examResults", payload);
      setForm({ marks: "", grade: "", examId: "", studentId: "", finalResultId: "" });
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create exam result");
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
          {exams.map((e) => (
            <option key={e.id} value={e.id}>{e.name}</option>
          ))}
        </select>

        <select name="studentId" value={form.studentId} onChange={handleChange}>
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <select name="finalResultId" value={form.finalResultId} onChange={handleChange}>
          <option value="">Select Final Result</option>
          {finalResults.map((f) => (
            <option key={f.id} value={f.id}>{f.id}</option>
          ))}
        </select>

        <button type="submit">Add Exam Result</button>
      </form>

      <table border="1">
        <thead>
          <tr><th>ID</th><th>Marks</th><th>Grade</th><th>Exam</th><th>Student</th></tr>
        </thead>
        <tbody>
          {examResults.map((er) => (
            <tr key={er.id}>
              <td>{er.id}</td>
              <td>{er.marks}</td>
              <td>{er.grade}</td>
              <td>{er.exam?.name}</td>
              <td>{er.student?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
