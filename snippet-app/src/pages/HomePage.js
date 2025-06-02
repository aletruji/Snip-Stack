import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import api from "../api"; // falls noch nicht importiert


function HomePage() {
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    console.log("Aktueller Token im Interceptor:", res.data.token);
    localStorage.setItem("email", email);

    navigate("/dashboard");
  } catch (err) {
    alert("Login fehlgeschlagen");
  }
};

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 relative">
      {/* Navbar */}
      <header className="flex justify-between items-center p-4 shadow bg-gray-100 dark:bg-gray-800 rounded-b-2xl">
        <div className="text-xl font-bold">🧩 SnippetApp</div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-300 dark:bg-gray-700 px-3 py-2 rounded-full shadow flex items-center justify-center"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          <span className="text-sm font-medium">
        {darkMode ? "Light Mode" : "Dark Mode"}
      </span>
        </button>
      </header>

      {/* Main */}
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold mb-6">Welcome to SnippetApp</h1>

        <form
          onSubmit={handleLogin}
          className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-sm"
        >
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium" htmlFor="email">
              Email
            </label>
           <input
  id="email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
  required
/>
          </div>
          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
  id="password"
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
  required
/>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Register
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Login
            </button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-2 left-4 text-sm text-gray-500 dark:text-gray-400">
        © 2025 Made by aletruji
      </footer>
    </div>
  );
}

export default HomePage;
