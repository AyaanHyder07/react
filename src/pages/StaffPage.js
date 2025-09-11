import { useEffect, useState } from "react";
import { fetchAll, createEntity } from "../api";

export default function StaffPage() {
  const [staff, setStaff] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({
    name: "",
    role: "",
    phone: "",
    address: "",
    departmentId: "",
  });
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setStaff(await fetchAll("staff"));
      setDepartments(await fetchAll("departments"));
    } catch (err) {
      setError("Failed to load staff");
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
        name: form.name,
        role: form.role,
        phone: form.phone,
        address: form.address,
        department: { id: Number(form.departmentId) },
      };
      await createEntity("staff", payload);
      setForm({ name: "", role: "", phone: "", address: "", departmentId: "" });
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create staff");
    }
  };

  return (
    <div>
      <h2>Staff</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="role" value={form.role} onChange={handleChange} placeholder="Role" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" />

        <select name="departmentId" value={form.departmentId} onChange={handleChange}>
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
        

        <button type="submit">Add Staff</button>
      </form>

      <table border="1">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Role</th><th>Phone</th><th>Department</th></tr>
        </thead>
        <tbody>
          {staff.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.role}</td>
              <td>{s.phone}</td>
              <td>{s.department?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
