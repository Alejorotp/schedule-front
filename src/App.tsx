import Sidebar from "./components/sidebar";
import Dashboard from "./components/dashboard";

function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
