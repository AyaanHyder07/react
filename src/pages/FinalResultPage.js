import { useEffect, useState } from "react";
import { fetchAll, createEntity, deleteEntity } from "../services/apiService";

export default function FinalResultPage() {
  const [finalResults, setFinalResults] = useState([]);
  const [students, setStudents] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [form, setForm] = useState({ subTotal: "", total: "", percentage: "", grade: "", studentId: "", semesterId: "" });
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setError(null);
      const [resultsResponse, studentsResponse, semestersResponse] = await Promise.all([
        fetchAll("finalresults"), fetchAll("students"), fetchAll("semesters"),
      ]);
      setFinalResults(Array.isArray(resultsResponse.data) ? resultsResponse.data : []);
      setStudents(Array.isArray(studentsResponse.data) ? studentsResponse.data : []);
      setSemesters(Array.isArray(semestersResponse.data) ? semestersResponse.data : []);
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
      
      // ✅ FINAL FIX: Get the 'data' property from the response
      const response = await createEntity("finalresults", payload);
      const newResult = response.data; // This is the new FinalResult DTO

      setFinalResults(currentResults => [...currentResults, newResult]);
      setForm({ subTotal: "", total: "", percentage: "", grade: "", studentId: "", semesterId: "" });
    } catch (err) { setError(err.response?.data?.message || "Failed to create final result"); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this final result?")) {
      try {
        setError(null);
        await deleteEntity("finalresults", id);
        setFinalResults(currentResults => currentResults.filter(fr => fr.id !== id));
      } catch (err) { setError(err.response?.data?.message || "Failed to delete final result"); }
    }
  };

  return (
    <div>
      <h3>Final Results</h3>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input name="subTotal" type="number" value={form.subTotal} onChange={handleChange} placeholder="Sub Total" />
        <input name="total" type="number" value={form.total} onChange={handleChange} placeholder="Total" />
        <input name="percentage" type="number" step="0.01" value={form.percentage} onChange={handleChange} placeholder="Percentage" />
        <input name="grade" value={form.grade} onChange={handleChange} placeholder="Grade" />
        <select name="studentId" value={form.studentId} onChange={handleChange} required>
          <option value="">Select Student</option>
          {students.map((s) => (<option key={s.id} value={s.id}>{s.name}</option>))}
        </select>
        <select name="semesterId" value={form.semesterId} onChange={handleChange} required>
          <option value="">Select Semester</option>
          {semesters.map((sem) => (<option key={sem.id} value={sem.id}>{sem.sno} - {sem.stage}</option>))}
        </select>
        <button type="submit">Add Final Result</button>
      </form>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
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