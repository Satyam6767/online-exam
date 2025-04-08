import { useState, useEffect, useContext } from "react";
import { getResults } from "../api/Api";
import { AuthContext } from "../context/AuthContext";
import "../styles/Results.css";

const Results = () => {
  const { user } = useContext(AuthContext);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getResults(user.token);
        setResults(data);
      } catch (error) {
        alert("Failed to fetch results");
      }
    };
    fetchResults();
  }, [user]);

  return (
    <div className="results-container">
      <div className="results-wrapper">
        <h2 className="results-title">Your Exam Results</h2>
        <ul className="results-list">
          {results.length > 0 ? (
            results.map((attempt) => (
              <li key={attempt._id} className="results-item">
                <strong>Exam:</strong> {attempt.exam.title} <br />
                <strong>Score:</strong> {attempt.score}
              </li>
            ))
          ) : (
            <p>No exam results available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Results;
