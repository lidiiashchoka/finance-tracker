import { useState } from "react";
import { NavLink, Link } from "react-router";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const user = true;
  const {
    logout,
  } = () => {
    console.log("Logout function called");
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold">
          FinanceTracker
        </NavLink>
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "underline" : "")}
          >
            Головна
          </NavLink>
          {user && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Панель
            </NavLink>
          )}
          {user && (
            <NavLink
              to="/transactions"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Транзакції
            </NavLink>
          )}
        </div>
        <div className="hidden md:flex">
          {user ? (
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Вийти
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Увійти
            </NavLink>
          )}
        </div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-blue-700 p-4 flex flex-col space-y-4">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "underline" : "")}
            onClick={() => setIsOpen(false)}
          >
            Головна
          </NavLink>
          {user && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "underline" : "")}
              onClick={() => setIsOpen(false)}
            >
              Панель
            </NavLink>
          )}
          {user && (
            <NavLink
              to="/transactions"
              className={({ isActive }) => (isActive ? "underline" : "")}
              onClick={() => setIsOpen(false)}
            >
              Транзакції
            </NavLink>
          )}
          {user ? (
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Вийти
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "underline" : "")}
              onClick={() => setIsOpen(false)}
            >
              Увійти
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
