import React, { useState } from "react";
import TransactionModal from "../components/TransactionModal";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div className="p-10 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Транзакції</h1>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-green-500 text-white px-6 py-3 rounded-lg mb-6 hover:bg-green-600 transition"
      >
        + Додати транзакцію
      </button>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {transactions.length === 0 ? (
          <p className="text-gray-500 text-center">Немає транзакцій</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {transactions.map((t, index) => (
              <li
                key={index}
                className={`p-4 flex justify-between items-center ${
                  t.type === "income" ? "text-green-500" : "text-red-500"
                }`}
              >
                <span>{t.description}</span>
                <span className="font-bold">{t.amount}€</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
export default Transactions;
