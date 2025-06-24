import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { Sun, Moon, Eye, EyeOff } from "lucide-react";

function RegisterPage() {
    const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  // Sends email and password to the backend to initiate registration
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
  await api.post("/auth/register", { email, password });
  navigate(`/verify?email=${encodeURIComponent(email)}`);
} catch (err) {
  alert("Registration failed. Please try again.");
}
  };

   useEffect(() => {
      document.documentElement.classList.toggle("dark", darkMode);
    }, [darkMode]);
  

  return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 relative">
      
       {/* Navbar */}
      <header className="absolute top-0 left-0 w-full flex justify-between items-center p-4 shadow bg-gray-100 dark:bg-gray-800 rounded-b-2xl">
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
      
       {/* Main form block */}
     <main className="flex-grow flex flex-col items-center justify-center px-4 pt-16 w-full">
      <h1 className="text-4xl font-bold mb-6">Create an Account</h1>
      <form
        onSubmit={handleRegister}
        className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-sm"
      >
        {/* Email field */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none  focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6 relative">
  <label htmlFor="password" className="block mb-1 text-sm font-medium">
    Password
  </label>
  <input
    id="password"
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full px-4 py-2 pr-10 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none  focus:ring-blue-500"
    required
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute top-9 right-3 text-gray-500 dark:text-gray-300"
    tabIndex={-1}
  >
    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>
</div>


        {/* Buttons: Register + Verify Code */}
        <div className="flex justify-between">
          <button
            type="button"
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
            onClick={() => navigate("/verify")}
          >
            Verify Code
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Register
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

export default RegisterPage;

