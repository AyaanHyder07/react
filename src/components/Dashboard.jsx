import React from "react";
import { NavLink, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { logout } from "../services/apiService";
import "./Dashboard.css";
import Main from "./Main"; 
import StudentPage from "../pages/StudentPage";
import DepartmentPage from "../pages/DepartmentPage";
import SemesterPage from "../pages/SemesterPage";
import StaffPage from "../pages/StaffPage";
import SubjectPage from "../pages/SubjectPage";
import AssessmentPage from "../pages/AssessmentPage";
import ExamPage from "../pages/ExamPage";
import ExamResultPage from "../pages/ExamResultPage";
import FinalResultPage from "../pages/FinalResultPage";
import HeaderDashboard from "./HeaderDashboard";
import FooterDashboard from "./FooterDashboard";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
    <HeaderDashboard/>
      <header className="dashboard-header">
        <nav className="navbar">
          <NavLink to="/dashboard/students">Students</NavLink>
          <NavLink to="/dashboard/departments">Departments</NavLink>
          <NavLink to="/dashboard/semesters">Semesters</NavLink>
          <NavLink to="/dashboard/staff">Staff</NavLink>
          <NavLink to="/dashboard/subjects">Subjects</NavLink>
          <NavLink to="/dashboard/assessments">Assessments</NavLink>
          <NavLink to="/dashboard/exams">Exams</NavLink>
          <NavLink to="/dashboard/examResults">Exam Results</NavLink>
          <NavLink to="/dashboard/finalResults">Final Results</NavLink>
        </nav>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </header>

      <main className="content">
        <Routes>
          <Route index element={<Main />} /> 
          <Route path="students" element={<StudentPage />} />
          <Route path="departments" element={<DepartmentPage />} />
          <Route path="semesters" element={<SemesterPage />} />
          <Route path="staff" element={<StaffPage />} />
          <Route path="subjects" element={<SubjectPage />} />
          <Route path="assessments" element={<AssessmentPage />} />
          <Route path="exams" element={<ExamPage />} />
          <Route path="examResults" element={<ExamResultPage />} />
          <Route path="finalResults" element={<FinalResultPage />} />
        </Routes>
      </main>
      <FooterDashboard/>
    </>
  );
};

export default Dashboard;