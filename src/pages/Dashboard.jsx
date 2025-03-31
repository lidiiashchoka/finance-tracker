import { useAuth } from "../context/AuthContext";
import {
  FaMoneyBillWave,
  FaChartPie,
  FaPlusCircle,
  FaHistory,
  FaListAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import TransactionModal from "../components/TransactionModal";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Dashboard = () => {
  const { user, transactions, setModalOpen } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const totalBalance = transactions.reduce(
    (acc, t) =>
      t.type === "income" ? acc + Number(t.amount) : acc - Number(t.amount),
    0
  );
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const recentTransactions = transactions.slice(-10).reverse();

  const incomeCategories = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => {
      if (!acc[t.category]) acc[t.category] = 0;
      acc[t.category] += Number(t.amount);
      return acc;
    }, {});

  const expenseCategories = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      if (!acc[t.category]) acc[t.category] = 0;
      acc[t.category] += Number(t.amount);
      return acc;
    }, {});

  const categoryComparisonData = {
    labels: ["Доходи", "Витрати"],
    datasets: [
      {
        label: "Сума",
        data: [totalIncome, totalExpense],
        backgroundColor: ["#4CAF50", "#E91E63"],
      },
    ],
  };

  return (
    <div className="px-6 md:px-10 py-24 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-6">Панель керування</h1>
      <p className="text-lg mb-10 max-w-lg text-center">
        Вітаємо, {user.name}! Ось ваша фінансова інформація.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <FaMoneyBillWave className="text-green-600 text-5xl mb-4" />
          <h2 className="text-xl font-bold">Баланс</h2>
          <p className="text-center text-sm mt-2">{totalBalance.toFixed(2)}€</p>
        </div>
        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <FaChartPie className="text-blue-600 text-5xl mb-4" />
          <h2 className="text-xl font-bold">Доходи</h2>
          <p className="text-center text-sm mt-2">{totalIncome.toFixed(2)}€</p>
        </div>
        <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <FaHistory className="text-red-600 text-5xl mb-4" />
          <h2 className="text-xl font-bold">Витрати</h2>
          <p className="text-center text-sm mt-2">{totalExpense.toFixed(2)}€</p>
        </div>
      </div>

      <div className="mt-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4">
            Доходи по категоріях
          </h2>
          <Pie
            data={{
              labels: Object.keys(incomeCategories),
              datasets: [
                {
                  data: Object.values(incomeCategories),
                  backgroundColor: [
                    "#4CAF50",
                    "#FF9800",
                    "#2196F3",
                    "#E91E63",
                    "#FFC107",
                  ],
                },
              ],
            }}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4">
            Витрати по категоріях
          </h2>
          <Pie
            data={{
              labels: Object.keys(expenseCategories),
              datasets: [
                {
                  data: Object.values(expenseCategories),
                  backgroundColor: [
                    "#4CAF50",
                    "#FF9800",
                    "#2196F3",
                    "#E91E63",
                    "#FFC107",
                  ],
                },
              ],
            }}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold text-center mb-4">
            Співвідношення доходів і витрат
          </h2>
          <Bar data={categoryComparisonData} />
        </div>
      </div>

      <div className="mt-10 w-full max-w-6xl">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <FaListAlt className="mr-2" /> Останні транзакції
          </h2>
          <button
            onClick={() => setModalOpen(true)}
            className=" bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition font-bold"
          >
            + Додати транзакцію
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {recentTransactions.length === 0 ? (
            <p className="text-gray-500 text-center">Немає транзакцій</p>
          ) : (
            <ul className="divide-y divide-gray-200 ">
              {recentTransactions.map((t, index) => (
                <li
                  key={index}
                  className="p-4 grid grid-cols-3 gap-3 items-center "
                >
                  <span className="font-bold">{t.category}</span>
                  <span className="text-center">{t.description}</span>
                  <span
                    className={`font-bold text-center ${
                      t.type === "income" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {t.amount}€
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <TransactionModal />
    </div>
  );
};

export default Dashboard;
