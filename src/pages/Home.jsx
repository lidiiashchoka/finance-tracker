import { FaChartLine, FaWallet, FaMoneyBillWave } from "react-icons/fa";

const Home = () => {
  return (
    <section className="px-6 md:px-10 py-24 bg-gradient-to-r from-indigo-500 to-blue-600 text-white min-h-screen grid">
      <div className="container mx-auto flex flex-col items-center justify-center h-full self-stretch">
        <h1 className="text-4xl font-extrabold mb-6 text-center">
          Ласкаво просимо до FinanceTracker
        </h1>
        <p className="text-lg mb-10 max-w-lg text-center">
          Управління фінансами ще ніколи не було таким простим! Відстежуйте свої
          доходи, витрати та переглядайте статистику в реальному часі.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <FaChartLine className="text-blue-600 text-5xl mb-4" />
            <h2 className="text-xl font-bold">Аналітика</h2>
            <p className="text-center text-sm mt-2">
              Переглядайте графіки та детальний аналіз фінансів.
            </p>
          </div>
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <FaWallet className="text-green-600 text-5xl mb-4" />
            <h2 className="text-xl font-bold">Баланс</h2>
            <p className="text-center text-sm mt-2">
              Контролюйте свої доходи та витрати.
            </p>
          </div>
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <FaMoneyBillWave className="text-yellow-500 text-5xl mb-4" />
            <h2 className="text-xl font-bold">Бюджет</h2>
            <p className="text-center text-sm mt-2">
              Ставте фінансові цілі та дотримуйтеся бюджету.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
