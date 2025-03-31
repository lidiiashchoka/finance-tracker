// src/components/TransactionModal.jsx
import { useState } from "react";

const TransactionModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [description, setDescription] = useState("");

  if (!isModalOpen) return null;

  const handleSubmit = () => {
    if (!amount || !description) return;

    setModalOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Додати транзакцію</h2>

        <input
          type="text"
          placeholder="Опис"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />

        <input
          type="number"
          placeholder="Сума"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="income">Доходи</option>
          <option value="expense">Витрати</option>
        </select>

        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Додати
          </button>
          <button
            onClick={() => setModalOpen(false)}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Скасувати
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
