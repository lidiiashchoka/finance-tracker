import React from "react";

const Navbar = () => {
  const { user, logout } = false;

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <div>
        <a to="/" className="mr-4">
          Головна
        </a>
        {user && (
          <a to="/dashboard" className="mr-4">
            Панель
          </a>
        )}
        {user && (
          <a to="/transactions" className="mr-4">
            Транзакції
          </a>
        )}
      </div>
      <div>
        {user ? (
          <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
            Вийти
          </button>
        ) : (
          <a to="/login" className="bg-green-500 px-4 py-2 rounded">
            Увійти
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
