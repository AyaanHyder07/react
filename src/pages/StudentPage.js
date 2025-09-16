import { useEffect, useState } from "react";
import { fetchAll, createEntity, deleteEntity, updateEntity } from "../services/apiService";

const initialFormState = { rgNo: "", name: "", contact: "", email: "", gender: "", dob: "", departmentId: "", semesterId: "" };

export default function StudentPage() {
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const loadData = async () => {
    try {
      setError(null);
      const [studentsResponse, departmentsResponse, semestersResponse] = await Promise.all([
        fetchAll("students"), fetchAll("departments"), fetchAll("semesters"),
      ]);
      setStudents(Array.isArray(studentsResponse.data) ? studentsResponse.data : []);
      setDepartments(Array.isArray(departmentsResponse.data) ? departmentsResponse.data : []);
      setSemesters(Array.isArray(semestersResponse.data) ? semestersResponse.data : []);
    } catch (err) { setError("Failed to load data"); }
  };

  useEffect(() => { loadData(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleEdit = (student) => {
    setEditingId(student.id);
    
    // ✅ FIX: Logic to find IDs moved *outside* the setForm call
    const dept = departments.find(d => d.name === student.departmentName);
    const sem = semesters.find(s => (s.sno + " - " + s.stage) === student.semesterInfo);

    setForm({
      rgNo: student.rgNo,
      name: student.name,
      contact: student.contact || "", // Handle potential null values
      email: student.email,
      gender: student.gender || "",
      dob: student.dob || "",
      departmentId: dept ? dept.id : "",
      semesterId: sem ? sem.id : "",
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(initialFormState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const payload = { ...form, departmentId: Number(form.departmentId), semesterId: Number(form.semesterId) };

      if (editingId) {
        const response = await updateEntity("students", editingId, payload);
        const updatedStudent = response.data;
        setStudents(students.map(s => (s.id === editingId ? updatedStudent : s)));
      } else {
        const response = await createEntity("students", payload);
        const newStudent = response.data;
        setStudents(currentStudents => [...currentStudents, newStudent]);
      }
      handleCancelEdit();
    } catch (err) { setError(err.response?.data?.message || `Failed to ${editingId ? 'update' : 'create'} student`); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        setError(null);
        await deleteEntity("students", id);
        setStudents(currentStudents => currentStudents.filter(s => s.id !== id));
      } catch (err) { setError(err.response?.data?.message || "Failed to delete student"); }
    }
  };

  return (
    <div>
      <h3>{editingId ? 'Update Student' : 'Add New Student'}</h3>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input name="rgNo" value={form.rgNo} onChange={handleChange} placeholder="Reg No" />
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input name="contact" value={form.contact} onChange={handleChange} placeholder="Contact" />
        <input name="gender" value={form.gender} onChange={handleChange} placeholder="Gender" />
        <input name="dob" type="date" value={form.dob} onChange={handleChange} />
        <select name="departmentId" value={form.departmentId} onChange={handleChange} required>
          <option value="">Select Department</option>
          {departments.map((d) => (<option key={d.id} value={d.id}>{d.name}</option>))}
        </select>
        <select name="semesterId" value={form.semesterId} onChange={handleChange} required>
          <option value="">Select Semester</option>
          {semesters.map((s) => (<option key={s.id} value={s.id}>{s.sno} - {s.stage}</option>))}
        </select>
        
        <button type="submit">{editingId ? 'Save Changes' : 'Add Student'}</button>
        {editingId && (
          <button type="button" onClick={handleCancelEdit} style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        )}
      </form>
      
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th><th>RegNo</th><th>Name</th><th>Email</th><th>Department</th><th>Semester</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td><td>{s.rgNo}</td><td>{s.name}</td><td>{s.email}</td>
              <td>{s.departmentName}</td><td>{s.semesterInfo}</td>
              <td>
                <button onClick={() => handleEdit(s)} style={{ marginRight: '5px' }}>Update</button>
                <button onClick={() => handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}