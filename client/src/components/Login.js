import { useState, useEffect } from "react";
import AuthService from "../services/auth.services";
import {
  addTokenToLocalStorage,
  getTokenFromLocalStorage,
} from "../utils/localStorage";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const jwt_token = getTokenFromLocalStorage("jwt_token");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Trim Data
      const email = userEmail.trim();
      const pass = password.trim();

      // Validation first
      if (!email) {
        setErrorMsg("Please enter your email.");
        setOpen(true);
        return;
      }

      if (!pass) {
        setErrorMsg("Please enter a password.");
        setOpen(true);
        return;
      }

      const res = await AuthService.login({ email, password: pass });

      if (res.status === 200) {
        const data = res.data;
        console.log(data);
        addTokenToLocalStorage(data.access_token);
        navigate("/dashboard");
      }
    } catch (error) {
      setErrorMsg("The username or password do not match.");
      setOpen(true);
    }
  };
  useEffect(() => {
    if (jwt_token) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [jwt_token, navigate]);

  return (
    <div className="flex-1 flex justify-center	items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="bg-white justify-center shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <div>
          <h2 className="text-xl font-bold mb-4">Login</h2>
          <input
            className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Username"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <input
            className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleLogin}
          >
            Login
          </button>
          {open && <p className="text-red-500 mt-2">{errorMsg}</p>}
        </div>
      </div>
    </div>
  );
}
