import { useEffect, useState } from "react";
import { fetchAll, createEntity } from "../api";

export default function SemesterPage() {
  const [semesters, setSemesters] = useState([]);
  const [form, setForm] = useState({ sno: "", stage: "", endYear: "" });
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setSemesters(await fetchAll("semesters"));
    } catch (err) {
      setError("Failed to load semesters");
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
      await createEntity("semesters", {
        sno: Number(form.sno),
        stage: form.stage,
        endYear: form.endYear,
      });
      setForm({ sno: "", stage: "", endYear: "" });
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create semester");
    }
  };

  return (
    <div>
      <h2>Semesters</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <input name="sno" value={form.sno} onChange={handleChange} placeholder="S.No" />
        <input name="stage" value={form.stage} onChange={handleChange} placeholder="Stage" />
        <input name="endYear" value={form.endYear} onChange={handleChange} placeholder="End Year" />
        <button type="submit">Add Semester</button>
      </form>

      <table border="1">
        <thead>
          <tr><th>ID</th><th>S.No</th><th>Stage</th><th>End Year</th></tr>
        </thead>
        <tbody>
          {semesters.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.sno}</td>
              <td>{s.stage}</td>
              <td>{s.endYear}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
