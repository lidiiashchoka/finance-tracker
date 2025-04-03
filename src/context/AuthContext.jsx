import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/transactions?username=${user.username}`)
        .then((res) => res.json())
        .then((data) => {
          const uniqueTransactions = [
            ...new Map(data.map((t) => [t.id, t])).values(),
          ];
          setTransactions(
            uniqueTransactions.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            )
          );

          console.log("🔹 Завантажено транзакції:", uniqueTransactions); // Додатковий лог
        })
        .catch((error) =>
          console.error("Помилка завантаження транзакцій:", error)
        );
    }
  }, [user, setTransactions]);

  const addTransaction = async (transaction) => {
    try {
      const response = await fetch("http://localhost:5000/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });
      const data = await response.json();
      setTransactions((prev) => [...prev, data.transaction]);
    } catch (error) {
      console.error("Помилка додавання транзакції", error);
    }
  };

  const login = async (username, password) => {
    if (!username || !password) return; // Запобігаємо порожнім запитам

    try {
      console.log("🔹 Відправка логіну:", { username, password }); // Додатковий лог

      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("❌ Невірний логін або пароль");
      }

      const data = await response.json();
      console.log("✅ Вхід успішний:", data.user);

      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      console.error("❌ Помилка авторизації:", error.message);
      alert(error.message);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/transactions/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("❌ Помилка видалення транзакції");
      }
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("❌ Помилка видалення транзакції:", error.message);
    }
  };

  const logout = () => {
    setUser(null);
    setTransactions([]);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        transactions,
        addTransaction,
        isModalOpen,
        setModalOpen,
        deleteTransaction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
