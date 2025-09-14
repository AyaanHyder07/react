import { useEffect, useState } from "react";
import { fetchAll, createEntity, deleteEntity } from "../api";

export default function FinalResultPage() {
  const [finalResults, setFinalResults] = useState([]);
  const [students, setStudents] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [form, setForm] = useState({ subTotal: "", total: "", percentage: "", grade: "", studentId: "", semesterId: "" });
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setError(null);
      const [resultsData, studentsData, semestersData] = await Promise.all([
        fetchAll("finalresults"), fetchAll("students"), fetchAll("semesters"),
      ]);
      setFinalResults(Array.isArray(resultsData) ? resultsData : []);
      setStudents(Array.isArray(studentsData) ? studentsData : []);
      setSemesters(Array.isArray(semestersData) ? semestersData : []);
    } catch (err) { setError("Failed to load data"); }
  };

  useEffect(() => { loadData(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const payload = {
        ...form,
        subTotal: Number(form.subTotal), total: Number(form.total),
        percentage: Number(form.percentage), studentId: Number(form.studentId),
        semesterId: Number(form.semesterId),
      };
      await createEntity("finalresults", payload);
      setForm({ subTotal: "", total: "", percentage: "", grade: "", studentId: "", semesterId: "" });
      loadData();
    } catch (err) { setError(err.response?.data?.message || "Failed to create final result"); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this final result?")) {
      try {
        setError(null);
        await deleteEntity("finalresults", id);
        loadData();
      } catch (err) { setError(err.response?.data?.message || "Failed to delete final result"); }
    }
  };

  return (
    <div>
      <h2>Final Results</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit}><input name="subTotal" value={form.subTotal} onChange={handleChange} placeholder="Sub Total" />
        <input name="total" value={form.total} onChange={handleChange} placeholder="Total" />
        <input name="percentage" value={form.percentage} onChange={handleChange} placeholder="Percentage" />
        <input name="grade" value={form.grade} onChange={handleChange} placeholder="Grade" />
        <select name="studentId" value={form.studentId} onChange={handleChange}>
          <option value="">Select Student</option>
          {students.map((s) => (<option key={s.id} value={s.id}>{s.name}</option>))}
        </select>
        <select name="semesterId" value={form.semesterId} onChange={handleChange}>
          <option value="">Select Semester</option>
          {semesters.map((sem) => (<option key={sem.id} value={sem.id}>{sem.sno} - {sem.stage}</option>))}
        </select>
        <button type="submit">Add Final Result</button></form>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th><th>Sub Total</th><th>Total</th><th>Percentage</th><th>Grade</th>
            <th>Student</th><th>Semester</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {finalResults.map((fr) => (
            <tr key={fr.id}>
              <td>{fr.id}</td><td>{fr.subTotal}</td><td>{fr.total}</td><td>{fr.percentage}</td><td>{fr.grade}</td>
              <td>{fr.studentName}</td><td>{fr.semesterInfo}</td>
              <td><button onClick={() => handleDelete(fr.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}