import { useState } from "react";

function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden p-4 text-gray-700"
        onClick={() => setOpen(!open)}
      >
        {open ? "✖️" : "☰"}
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 h-screen w-64 bg-gray-900 text-gray-100 flex flex-col transform 
          ${open ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 transition-transform duration-300 z-20
        `}
      >
        {/* Logo */}
        <div className="p-4 text-xl font-bold border-b border-gray-700">
          Mi Dashboard
        </div>

        {/* Links */}
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="block p-2 rounded hover:bg-gray-700">
            🏠 Inicio
          </a>
          <a href="#" className="block p-2 rounded hover:bg-gray-700">
            📊 Estadísticas
          </a>
          <a href="#" className="block p-2 rounded hover:bg-gray-700">
            ⚙️ Configuración
          </a>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <a href="#" className="block p-2 rounded hover:bg-gray-700">
            🚪 Cerrar sesión
          </a>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
