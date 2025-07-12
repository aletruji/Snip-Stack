import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import RegisterPage from "./pages/RegisterPage.js";
import VerifyPage from "./pages/VerifyPage.js";
import { Toaster } from 'react-hot-toast';



function App() {
  return (
    <>
      <Toaster position="top-center" />
    <Routes>
      
        
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        
          
      
    </Routes>
    </>
  );
}

export default App;
