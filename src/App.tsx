import AppRoutes from "./routes";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <AppRoutes />
    </div>
  );
};

export default App;



