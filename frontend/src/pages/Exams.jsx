import { useState, useEffect, useContext } from "react";
import { getExams } from "../api/Api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Exams.css"
import Header from "../components/Header";


const Exams = () => {
  const { user } = useContext(AuthContext);
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const data = await getExams(user.token);
        setExams(data);
      } catch (error) {
        alert("Failed to fetch exams");
      }
    };
    fetchExams();
  }, [user]);

  return (
    <>
    <Header />
    
    <div className="exam-container">
      <div className="exam-wrapper">
        <h2 className="exam-title">Available Exams</h2>
        <ul className="exam-list">
          {exams.map((exam) => (
            <li key={exam._id} className="exam-item">
              {exam.title} - {exam.subject}
              <button
                className="exam-button"
                onClick={() => navigate(`/attempt/${exam._id}`)}
              >
                Start Exam
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default Exams;
