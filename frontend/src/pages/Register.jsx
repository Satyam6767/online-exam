import { useState } from "react";
import { registerUser } from "../api/Api";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(name, email, password, role);
      navigate("/login");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div>
      <Header />
      <Navbar />
      <div className="outerregister">
        <div className="innerregister">
        <h2>Register</h2>
      <form className="finalform" onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <button className="btn btn-success" type="submit">Register</button>
      </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
