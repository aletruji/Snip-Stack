import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import api from "../api";

function VerifyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const emailFromUrl = queryParams.get("email") || "";

  const [darkMode, setDarkMode] = useState(true);
  const [email, setEmail] = useState(emailFromUrl);
  const [code, setCode] = useState("");

  // Toggle dark mode class on root element
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

 const handleVerify = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("/auth/verify", { email, code });
    if (res.status === 200) {
      alert("Verification successful!");
      navigate("/"); // Login Seite oder Home
    }
  } catch (err) {
    console.error("Verify error:", err);
    alert(err.response?.data || "Verification failed. Please try again.");
  }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 relative">
      
      {/* Navbar */}
      <header className="absolute top-0 left-0 w-full flex justify-between items-center p-4 shadow bg-gray-100 dark:bg-gray-800 rounded-b-2xl">
        <div className="text-xl font-bold">🧩 SnipStack</div>
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

      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-16 w-full">
        <h1 className="text-4xl font-bold mb-6">Verify your email</h1>
        <form
          onSubmit={handleVerify}
          className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-sm"
        >
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
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

          {/* Verification code */}
          <div className="mb-6">
            <label htmlFor="code" className="block mb-1 text-sm font-medium">
              6-digit Code
            </label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              className="tracking-widest text-lg text-center w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            Confirm Code
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-2 left-4 text-sm text-gray-500 dark:text-gray-400">
        © 2025 Made by aletruji
      </footer>
    </div>
  );
}

export default VerifyPage;
