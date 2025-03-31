import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      login(username);
      navigate("/dashboard");
    }
  };

  return (
    <div className="p-10 bg-gradient-to-r from-indigo-500 to-blue-600 text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold mb-6">Авторизація</h1>
      <p className="text-lg mb-10 max-w-lg text-center">
        Увійдіть у систему, щоб керувати своїми фінансами та відстежувати свої
        доходи та витрати.
      </p>
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <input
          type="text"
          placeholder="Ім'я користувача"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition font-bold"
        >
          Увійти
        </button>
      </div>
    </div>
  );
};

export default Login;
