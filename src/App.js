import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StudentPage from "./pages/StudentPage";
import DepartmentPage from "./pages/DepartmentPage";
import SemesterPage from "./pages/SemesterPage";
import StaffPage from "./pages/StaffPage";
import SubjectPage from "./pages/SubjectPage";
import AssessmentPage from "./pages/AssessmentPage";
import ExamPage from "./pages/ExamPage";
import ExamResultPage from "./pages/ExamResultPage";
import FinalResultPage from "./pages/FinalResultPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <Link to="/students">Students</Link>
          <Link to="/departments">Departments</Link>
          <Link to="/semesters">Semesters</Link>
          <Link to="/staff">Staff</Link>
          <Link to="/subjects">Subjects</Link>
          <Link to="/assessments">Assessments</Link>
          <Link to="/exams">Exams</Link>
          <Link to="/examResults">Exam Results</Link>
          <Link to="/finalResults">Final Results</Link>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/students" element={<StudentPage />} />
            <Route path="/departments" element={<DepartmentPage />} />
            <Route path="/semesters" element={<SemesterPage />} />
            <Route path="/staff" element={<StaffPage />} />
            <Route path="/subjects" element={<SubjectPage />} />
            <Route path="/assessments" element={<AssessmentPage />} />
            <Route path="/exams" element={<ExamPage />} />
            <Route path="/examResults" element={<ExamResultPage />} />
            <Route path="/finalResults" element={<FinalResultPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
