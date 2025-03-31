import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Transactions from "./pages/Transactions";
import Navbar from "./components/Navbar";
import TransactionModal from "./components/TransactionModal";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar />
        <div className="container mx-auto p-6 flex-grow">
          <TransactionModal />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
