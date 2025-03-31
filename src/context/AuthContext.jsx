import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const login = (name) => setUser({ name });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, transactions, addTransaction, isModalOpen, setModalOpen }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);