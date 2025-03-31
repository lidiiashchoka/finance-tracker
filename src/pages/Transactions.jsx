import TransactionModal from "../components/TransactionModal";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const Transactions = () => {
  const { user, transactions, setModalOpen, deleteTransaction } = useAuth(); // Додано deleteTransaction
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <>
      <div className="px-6 md:px-10 py-24 bg-gradient-to-r from-indigo-500 to-blue-600 text-white min-h-screen flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-6">Всі транзакції</h1>
        <p className="text-lg mb-10 max-w-lg text-center">
          Переглядайте всі ваші фінансові операції у зручному форматі.
        </p>

        <button
          onClick={() => setModalOpen(true)}
          className="mb-6 bg-yellow-400 text-gray-900 px-6 py-3 rounded-full shadow-lg hover:bg-yellow-500 transition font-bold flex items-center gap-2"
        >
          <span className="text-xl">+</span> Додати транзакцію
        </button>

        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl text-gray-800">
          {transactions.length === 0 ? (
            <p className="text-gray-500 text-center">Немає транзакцій</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left">Опис</th>
                  <th className="p-3 text-left">Категорія</th>
                  <th className="p-3 text-right">Сума</th>
                  <th className="p-3 text-right">Дата</th>
                  <th className="p-3 text-right">Дії</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, index) => (
                  <tr key={index} className="border-t border-gray-300">
                    <td className="p-3">{t.description}</td>
                    <td className="p-3">{t.category}</td>
                    <td
                      className={`p-3 font-bold text-right ${
                        t.type === "income" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {t.amount}€
                    </td>
                    <td className="p-3 text-right text-gray-600">
                      {new Date(t.date).toLocaleString()}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => deleteTransaction(t.id)}
                        className="text-red-500 hover:underline"
                      >
                        Видалити
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <TransactionModal />
    </>
  );
};

export default Transactions;
