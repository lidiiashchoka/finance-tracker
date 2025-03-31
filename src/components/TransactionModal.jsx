import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaTimes } from "react-icons/fa";

const incomeCategories = ["Зарплата", "Фріланс", "Подарунки", "Дивіденди"];
const expenseCategories = [
  "Їжа",
  "Транспорт",
  "Розваги",
  "Оренда",
  "Комунальні послуги",
];

const TransactionModal = () => {
  const { isModalOpen, setModalOpen, addTransaction, user } = useAuth() || {};
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(incomeCategories[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !description || !user?.username || isSubmitting) return;

    setIsSubmitting(true); // Prevent duplicate submissions immediately

    const newTransaction = {
      user: user.username,
      amount: Number(amount),
      type,
      description,
      category,
      date: new Date().toISOString(),
    };

    try {
      addTransaction(newTransaction);
      setAmount("");
      setDescription("");
      setType("income");
      setCategory(incomeCategories[0]);
      setModalOpen(false);
    } catch (error) {
      console.error("Помилка:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-20">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-96 relative">
        <button
          onClick={() => setModalOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={18} />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Додати транзакцію
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Опис"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="number"
            placeholder="Сума"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setCategory(
                e.target.value === "income"
                  ? incomeCategories[0]
                  : expenseCategories[0]
              );
            }}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="income">Доходи</option>
            <option value="expense">Витрати</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {(type === "income" ? incomeCategories : expenseCategories).map(
              (cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              )
            )}
          </select>

          <div className="flex justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition font-bold w-full"
            >
              {isSubmitting ? "Додається..." : "Додати транзакцію"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
