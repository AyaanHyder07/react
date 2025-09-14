import { useEffect, useState } from "react";
import { fetchAll, createEntity, deleteEntity } from "../api";

export default function StudentPage() {
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [form, setForm] = useState({ rgNo: "", name: "", contact: "", email: "", gender: "", dob: "", departmentId: "", semesterId: "" });
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setError(null);
      const [studentsData, departmentsData, semestersData] = await Promise.all([
        fetchAll("students"), fetchAll("departments"), fetchAll("semesters"),
      ]);
      setStudents(Array.isArray(studentsData) ? studentsData : []);
      setDepartments(Array.isArray(departmentsData) ? departmentsData : []);
      setSemesters(Array.isArray(semestersData) ? semestersData : []);
    } catch (err) { setError("Failed to load data"); }
  };

  useEffect(() => { loadData(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const payload = { ...form, departmentId: Number(form.departmentId), semesterId: Number(form.semesterId) };
      await createEntity("students", payload);
      setForm({ rgNo: "", name: "", contact: "", email: "", gender: "", dob: "", departmentId: "", semesterId: "" });
      loadData();
    } catch (err) { setError(err.response?.data?.message || "Failed to create student"); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        setError(null);
        await deleteEntity("students", id);
        loadData(); // Refresh the list after deleting
      } catch (err) { setError(err.response?.data?.message || "Failed to delete student"); }
    }
  };

  return (
    <div>
      <h2>Students</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input name="rgNo" value={form.rgNo} onChange={handleChange} placeholder="Reg No" />
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="contact" value={form.contact} onChange={handleChange} placeholder="Contact" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input name="gender" value={form.gender} onChange={handleChange} placeholder="Gender" />
        <input type="date" name="dob" value={form.dob} onChange={handleChange} />
        <select name="departmentId" value={form.departmentId} onChange={handleChange}>
          <option value="">Select Department</option>
          {departments.map((d) => (<option key={d.id} value={d.id}>{d.name}</option>))}
        </select>
        <select name="semesterId" value={form.semesterId} onChange={handleChange}>
          <option value="">Select Semester</option>
          {semesters.map((s) => (<option key={s.id} value={s.id}>{s.sno} - {s.stage}</option>))}
        </select>
        <button type="submit">Add Student</button>
      </form>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th><th>RegNo</th><th>Name</th><th>Email</th><th>Department</th><th>Semester</th>
            <th>Actions</th> {/* ✅ New Column */}
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td><td>{s.rgNo}</td><td>{s.name}</td><td>{s.email}</td>
              <td>{s.departmentName}</td><td>{s.semesterInfo}</td>
              <td> {/* ✅ New Cell with Delete Button */}
                <button onClick={() => handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}