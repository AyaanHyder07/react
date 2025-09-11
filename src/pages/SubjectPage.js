import { useEffect, useState } from "react";
import { fetchAll, createEntity } from "../api";

export default function SubjectPage() {
  const [subjects, setSubjects] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [form, setForm] = useState({
    code: "",
    name: "",
    credits: "",
    duration: "",
    assessmentIds: [],
  });
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setSubjects(await fetchAll("subjects"));
      setAssessments(await fetchAll("assessments"));
    } catch (err) {
      setError("Failed to load subjects");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAssessmentChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (opt) => Number(opt.value));
    setForm({ ...form, assessmentIds: options });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        code: form.code,
        name: form.name,
        credits: Number(form.credits),
        duration: Number(form.duration),
        assessments: form.assessmentIds.map((id) => ({ id })),
      };
      await createEntity("subjects", payload);
      setForm({ code: "", name: "", credits: "", duration: "", assessmentIds: [] });
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create subject");
    }
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

        <select multiple value={form.assessmentIds} onChange={handleAssessmentChange}>
          {assessments.map((a) => (
            <option key={a.id} value={a.id}>{a.number}</option>
          ))}
        </select>

        <button type="submit">Add Subject</button>
      </form>

      <table border="1">
        <thead>
          <tr><th>ID</th><th>Code</th><th>Name</th><th>Credits</th></tr>
        </thead>
        <tbody>
          {subjects.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.code}</td>
              <td>{s.name}</td>
              <td>{s.credits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
