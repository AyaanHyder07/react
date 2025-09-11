import { Link } from "react-router-dom";

const entities = [
  "students",
  "departments",
  "semesters",
  "staff",
  "subjects",
  "assessments",
  "exams",
  "examResults",
  "finalResults",
];

export default function EntityList() {
  return (
    <div>
      <h2>Entity Browser</h2>
      <ul>
        {entities.map((e) => (
          <li key={e}>
            <Link to={`/${e}`}>{e}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
