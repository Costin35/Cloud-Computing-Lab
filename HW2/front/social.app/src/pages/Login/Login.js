import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import './styles.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const handleRegister = () => {
    navigate("/register");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/home");
    } catch (error) {
      setErrMsg(error.message);
    }
  };

  return (
    <div className="main-login">
      <h1 className="Login">Login</h1>
      {errMsg && <p style={{ color: "red" }}>{errMsg}</p>}
      <form className="LoginForm">
        <label className="Email" htmlFor="email">Email:</label>
        <input
          className="Email"
          type="email"
          id="email"
          placeholder="johndoe@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />

        <button type="submit" onClick={handleSubmit}>Login</button>
        <button type="button" onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
};

export default Login;