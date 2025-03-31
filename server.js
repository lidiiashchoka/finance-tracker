const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;
const DB_FILE = path.join(__dirname, "db.json");

app.use(cors());
app.use(express.json());

const initialData = {
  users: [{ username: "test", password: "password" }],
  transactions: [
    {
      id: "1",
      user: "test",
      amount: 500,
      type: "income",
      description: "Зарплата",
      category: "Зарплата",
      date: "2025-03-31T10:00:00Z",
    },
    {
      id: "2",
      user: "test",
      amount: 50,
      type: "expense",
      description: "Кафе",
      category: "Їжа",
      date: "2025-03-31T12:00:00Z",
    },
    {
      id: "3",
      user: "test",
      amount: 30,
      type: "expense",
      description: "Таксі",
      category: "Транспорт",
      date: "2025-03-31T15:00:00Z",
    },
  ],
};

const initializeDatabase = () => {
  if (!fs.existsSync(DB_FILE)) {
    console.log("🔹 Файл db.json не знайдено. Створюю новий...");
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf8");
  }
};

initializeDatabase();

const readDatabase = () => {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
  } catch (error) {
    return initialData;
  }
};

const writeDatabase = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
};

// Авторизація користувача
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const db = readDatabase();
  const user = db.users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.json({ success: true, user });
  } else {
    res
      .status(401)
      .json({ success: false, message: "Невірний логін або пароль" });
  }
});

// Отримати всі транзакції для користувача
app.get("/transactions", (req, res) => {
  const { username } = req.query;
  const db = readDatabase();
  const transactions = db.transactions.filter((t) => t.user === username);
  res.json(transactions);
});

// Додати транзакцію з унікальним ID
app.post("/transactions", (req, res) => {
  const { user, amount, type, description, category, date } = req.body;

  if (!user || !amount || !type || !description || !category || !date) {
    return res
      .status(400)
      .json({ success: false, message: "Некоректні дані транзакції" });
  }

  const db = readDatabase();
  const transactionId = Math.random().toString(36).substring(2, 15); // Генерація унікального ID
  const existingTransaction = db.transactions.find(
    (t) => t.id === transactionId
  );
  if (existingTransaction) {
    return res.status(400).json({
      success: false,
      message: "Транзакція з таким ID вже існує",
    });
  }

  const newTransaction = {
    id: transactionId,
    user,
    amount,
    type,
    description,
    category,
    date,
  };
  db.transactions.push(newTransaction);
  writeDatabase(db);
  res.json({ success: true, transaction: newTransaction });
});

// Видалити транзакцію
app.delete("/transactions/:id", (req, res) => {
  const { id } = req.params; // Отримуємо ID з URL
  const db = readDatabase();

  const initialLength = db.transactions.length;
  db.transactions = db.transactions.filter((t) => t.id !== id);

  if (db.transactions.length === initialLength) {
    return res
      .status(404)
      .json({ success: false, message: "Транзакцію не знайдено" });
  }

  writeDatabase(db);
  res.json({ success: true, message: "Транзакцію видалено" });
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});

module.exports = app;
