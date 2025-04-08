import { useState, useEffect, useContext } from "react";
import { attemptExam, getExams } from "../api/Api";
import { AuthContext } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/AtttemptExams.css"

const AttemptExam = () => {
  const { user } = useContext(AuthContext);
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [responses, setResponses] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const exams = await getExams(user.token);
        const selectedExam = exams.find((e) => e._id === examId);
        setExam(selectedExam);
      } catch (error) {
        alert("Failed to load exam");
      }
    };
    fetchExam();
  }, [user, examId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedResponses = Object.keys(responses).map((questionId) => ({
      question: questionId,
      selectedAnswer: responses[questionId],
    }));

    try {
      await attemptExam(user.token, examId, formattedResponses);
      navigate("/results");
    } catch (error) {
      alert("Failed to submit exam");
    }
  };

  if (!exam) return <h2>Loading...</h2>;

  return (
    <div className="attempt-exam-container">
      <div className="attempt-exam-wrapper">
        <h2 className="attempt-exam-title">{exam.title} - {exam.subject}</h2>
        <form className="attempt-exam-form" onSubmit={handleSubmit}>
          {exam.questions.map((question) => (
            <div key={question._id} className="exam-question">
              <h3>{question.text}</h3>
              <div className="exam-options">
                {question.options.map((option, idx) => (
                  <label key={idx}>
                    <input
                      type="radio"
                      name={question._id}
                      value={option}
                      onChange={() => setResponses({ ...responses, [question._id]: option })}
                      required
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button type="submit" className="exam-submit-button">Submit Exam</button>
        </form>
      </div>
    </div>
  );
  
};

export default AttemptExam;
