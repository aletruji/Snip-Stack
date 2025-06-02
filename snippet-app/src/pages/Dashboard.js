import { useState, useEffect } from "react";
import { Sun, Moon, Copy, Plus, Trash2, Edit  } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api"





function Dashboard() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [languages, setLanguages] = useState([]);
  const [snippets, setSnippets] = useState([]);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [allLanguages, setAllLanguages] = useState([]); // globale DB-Sprachen
  const [customName, setCustomName] = useState("");
  const [customLogo, setCustomLogo] = useState("");
  const [selectedFromDropdown, setSelectedFromDropdown] = useState("");
  const [contextMenuLang, setContextMenuLang] = useState(null);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, langIdx: null });




 
   const navigate = useNavigate();
   const email = localStorage.getItem("email");
   const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

useEffect(() => {
  fetch("http://localhost:8080/api/languages")
    .then(res => res.json())
    .then(data => setAllLanguages(data)); // nur globale Dropdown-Sprachen
}, []);


   useEffect(() => {
    const handleClickOutside = () => setContextMenu({ ...contextMenu, visible: false });
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [contextMenu]);

 useEffect(() => {
  if (!email) return;

  api.get("/snippets", {
    params: { email }
  })
    .then(res => {
      setSnippets(res.data);
    })
    .catch(err => console.error("API error:", err));
}, [email]);

useEffect(() => {
  if (!email) return;

  api.get(`/user-languages`, { params: { email } })
    .then(res => setLanguages(res.data))
    .catch(err => console.error("Sprachen-Laden-Fehler:", err));
}, [email]);



 

  const handleEditSnippet = (index) => {
 alert(`Edit Snippet ${index} (coming soon!)`);

  // später mit Modal / Formular
};

const handleAddSnippet = async () => {
  let language = selectedLanguage;

  if (!language) {
    language = prompt("Bitte Sprache auswählen (z.B. Java, Python):");
    if (!language) return;
  }

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  if (!email || !token) {
    alert("Bitte erneut einloggen.");
    navigate("/");
    return;
  }

  const newSnippet = {
    title: "New Snippet",
    code: "// your code here",
    language
  };

  try {
    const res = await api.post(
      `/snippets?email=${email}`,
      newSnippet,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setSnippets(prev => [...prev, res.data]);
  } catch (err) {
    console.error("Create error:", err);
  }
};



  const handleDeleteSnippet = (index) => {
    const updated = [...snippets];
    updated.splice(index, 1);
    setSnippets(updated);
  };

const handleAddLanguage = async () => {
  try {
    const res = await api.get("/languages"); // Kein Header nötig, Interceptor macht das
    setAllLanguages(res.data);
    setShowLanguageModal(true);
  } catch (err) {
    console.error("Fehler beim Laden der Sprachen:", err);
    alert("Zugriff verweigert – bist du eingeloggt?");
  }
};



  return (

    
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* TopBar */}
      <header className="flex justify-between items-center p-4 shadow bg-gray-100 dark:bg-gray-800 rounded-b-2xl">
  {/* Left: Logo */}
  <div className="text-xl font-bold">🧩 SnipStack</div>

  {/* Middle: Search */}
  <input
    type="text"
    placeholder="Search snippets..."
    className="w-1/2 px-3 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  {/* Right: Toggle + Logout */}
  <div className="flex items-center gap-3">
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="bg-gray-300 dark:bg-gray-700 px-3 py-2 rounded-full shadow flex items-center gap-2"
    >
      {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      <span className="text-sm font-medium">
        {darkMode ? "Light Mode" : "Dark Mode"}
      </span>
    </button>

    <button
              onClick={() => navigate("/")}
      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-full shadow text-sm"
    >
      Logout
    </button>
  </div>
</header>

      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <aside className="w-48 bg-gray-200 dark:bg-gray-800 p-4 flex flex-col justify-between">
          <div>
            <h2 className="font-semibold mb-4">Languages</h2>
            <ul className="space-y-2">
  <li
    onClick={() => setSelectedLanguage(null)}
    className={`p-2 rounded cursor-pointer ${
      selectedLanguage === null ? 'bg-blue-500 text-white' : 'hover:bg-gray-300 dark:hover:bg-gray-700'
    }`}
  >
    All
  </li>

  {languages.map((lang, idx) => (
   <li
    key={idx}
    onClick={() => setSelectedLanguage(lang.name)}
    onContextMenu={(e) => {
      e.preventDefault();
      setContextMenu({ visible: true, x: e.pageX, y: e.pageY, langIdx: idx });
    }}
    className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
      selectedLanguage === lang.name ? 'bg-blue-500 text-white' : 'hover:bg-gray-300 dark:hover:bg-gray-700'
    }`}
  >
    <span>{lang.logo}</span>
    <span>{lang.name}</span>
  </li>
  ))}
</ul>

          </div>
          <button
  onClick={handleAddLanguage}
  className="mb-4 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-2"
>
  <Plus size={16} /> Add Language
</button>
        </aside>

        {/* Main Snippet Area */}
        <main className="flex-grow p-6 overflow-y-auto max-h-[calc(100vh-100px)] scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Snippets</h2>
            <button
              onClick={handleAddSnippet}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus size={16} /> Add Snippet
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {snippets.map((snip, idx) => (
              <div
                key={idx}
                className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col justify-between min-h-[220px]"
              >
                <div className="flex justify-between items-start">
  <h3 className="font-semibold mb-2">{snip.title}</h3>
  <div className="flex gap-2">
    <button
      onClick={() => handleEditSnippet(idx)}
      className="text-blue-500 hover:text-blue-700"
      title="Edit"
    >
      <Edit size={16} />
    </button>
    <button
      onClick={() => handleDeleteSnippet(idx)}
      className="text-red-500 hover:text-red-700"
      title="Delete"
    >
      <Trash2 size={16} />
    </button>
  </div>
</div>
                <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded text-sm overflow-x-auto max-h-32">
                  <code>{snip.code}</code>
                </pre>
                <div className="flex justify-between items-center mt-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>{snip.language}</span>
                  <button
                    onClick={() => copyToClipboard(snip.code)}
                    className="flex items-center gap-1 hover:text-blue-500"
                  >
                    <Copy size={16} /> Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
       {/* Footer */}
      <footer className="absolute bottom-2 left-4 text-sm text-gray-500 dark:text-gray-400">
        © 2025 Made by aletruji
      </footer>

     


       {/* MODAL: Add Language */}
    {showLanguageModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
          <h3 className="text-lg font-bold mb-4">Add Language</h3>

          <select
            className="w-full mb-2 p-2 rounded border bg-white text-black dark:bg-gray-700 dark:text-white"
            value={selectedFromDropdown}
            onChange={(e) => setSelectedFromDropdown(e.target.value)}
          >
            <option value="">-- Choose from list --</option>
            {allLanguages.map((lang, idx) => (
              <option key={idx} value={lang.name}>
                {lang.logo} {lang.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Or enter language name"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            className="w-full mb-2 p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white"
          />

          <input
            type="text"
            placeholder="Emoji/Symbol"
            value={customLogo}
            onChange={(e) => setCustomLogo(e.target.value)}
            className="w-full mb-4 p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white"
          />

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowLanguageModal(false)}
              className="px-3 py-1 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const name = selectedFromDropdown || customName.trim();
                const logo = selectedFromDropdown
                  ? allLanguages.find(l => l.name === selectedFromDropdown)?.logo
                  : customLogo.trim();

   if (name && logo) {
  api.post("/user-languages", {
    email,
    name,
    logo,
  })
    .then(res => {
      console.log("Neue Sprache:", res.data);
      setLanguages(prev => [...prev, res.data]);
      setShowLanguageModal(false);
      setSelectedFromDropdown("");
      setCustomName("");
      setCustomLogo("");
    })
    .catch(err => alert("Fehler beim Speichern der Sprache"));
}

              }}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    )}

    {contextMenu.visible && (
  <ul
    className="absolute z-50 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow"
    style={{ top: contextMenu.y, left: contextMenu.x }}
    onClick={() => setContextMenu({ ...contextMenu, visible: false })}
  >
    <li
      className="px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer"
     onClick={() => {
  const langToDelete = languages[contextMenu.langIdx];
  api.delete(`/user-languages/${langToDelete.id}`)
    .then(() => {
      setLanguages(prev => prev.filter((_, i) => i !== contextMenu.langIdx));
      setContextMenu({ visible: false, x: 0, y: 0, langIdx: null });
      if (selectedLanguage === langToDelete.name) {
        setSelectedLanguage(null);
      }
    })
    .catch(err => {
      alert("Fehler beim Löschen der Sprache");
      console.error(err);
    });
}}

    >
      Delete
    </li>
  </ul>
)}

  </div>
);

}

export default Dashboard;