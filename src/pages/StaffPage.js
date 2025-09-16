import React, { useEffect, useState } from "react";
import { fetchAll, createEntity, deleteEntity, updateEntity } from "../services/apiService";

const initialFormState = { name: "", role: "", phone: "", address: "", email: "", departmentId: "" };

export default function StaffPage() {
  const [staff, setStaff] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const loadData = async () => {
    try {
      setError(null);
      const [staffResponse, departmentsResponse] = await Promise.all([
        fetchAll("staff"), 
        fetchAll("departments")
      ]);
      setStaff(Array.isArray(staffResponse.data) ? staffResponse.data : []);
      setDepartments(Array.isArray(departmentsResponse.data) ? departmentsResponse.data : []);
    } catch (err) { 
      setError("Failed to load staff data."); 
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleEdit = (staffMember) => {
    setEditingId(staffMember.id);
    
    const dept = departments.find(d => d.name === staffMember.departmentName);
    
    setForm({ 
      name: staffMember.name,
      role: staffMember.role,
      phone: staffMember.phone,
      address: staffMember.address,
      email: staffMember.email,
      departmentId: dept ? dept.id : "" 
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
      const payload = { ...form, departmentId: Number(form.departmentId) };

      if (editingId) {
        const response = await updateEntity("staff", editingId, payload);
        const updatedStaff = response.data;
        setStaff(staff.map(s => (s.id === editingId ? updatedStaff : s)));
      } else {
        const response = await createEntity("staff", payload);
        const newStaff = response.data;
        setStaff(currentStaff => [...currentStaff, newStaff]);
      }
      handleCancelEdit();
    } catch (err) { 
      setError(err.response?.data?.message || `Failed to ${editingId ? 'update' : 'create'} staff`); 
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      try {
        setError(null);
        await deleteEntity("staff", id);
        setStaff(currentStaff => currentStaff.filter(s => s.id !== id));
      } catch (err) { setError(err.response?.data?.message || "Failed to delete staff member"); }
    }
  };

  return (
    <div>
      <h3>{editingId ? 'Update Staff Member' : 'Add New Staff'}</h3>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="role" value={form.role} onChange={handleChange} placeholder="Role" required />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" />
        <select name="departmentId" value={form.departmentId} onChange={handleChange} required>
          <option value="">Select Department</option>
          {departments.map((d) => (<option key={d.id} value={d.id}>{d.name}</option>))}
        </select>
        
        <button type="submit">{editingId ? 'Save Changes' : 'Add Staff'}</button>
        {editingId && (
          <button type="button" onClick={handleCancelEdit} style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        )}
      </form>

      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Role</th><th>Phone</th><th>Email</th><th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.role}</td>
              <td>{s.phone}</td>
              <td>{s.email}</td>
              <td>{s.departmentName}</td>
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