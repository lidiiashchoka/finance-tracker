import { render, screen, fireEvent } from "@testing-library/react";
import TransactionModal from "../components/TransactionModal";
import { AuthContext } from "../context/AuthContext";
import React from "react";

// Допоміжна функція для обгортання компоненту мок-контекстом
const renderWithContext = (ui, contextValue) => {
  return render(
    <AuthContext.Provider value={contextValue}>{ui}</AuthContext.Provider>
  );
};

describe("TransactionModal", () => {
  it("не рендерить модалку якщо isModalOpen = false", () => {
    renderWithContext(<TransactionModal />, {
      isModalOpen: false,
      setModalOpen: jest.fn(),
      addTransaction: jest.fn(),
      user: { username: "test" },
    });

    expect(screen.queryByText(/додати транзакцію/i)).not.toBeInTheDocument();
  });

  it("рендерить всі поля правильно", () => {
    renderWithContext(<TransactionModal />, {
      isModalOpen: true,
      setModalOpen: jest.fn(),
      addTransaction: jest.fn(),
      user: { username: "test" },
    });

    expect(screen.getByPlaceholderText("Опис")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Сума")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /додати транзакцію/i })
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("Зарплата")).toBeInTheDocument(); // incomeCategories[0]
  });

  it("можна змінювати поля", () => {
    renderWithContext(<TransactionModal />, {
      isModalOpen: true,
      setModalOpen: jest.fn(),
      addTransaction: jest.fn(),
      user: { username: "test" },
    });

    fireEvent.change(screen.getByPlaceholderText("Опис"), {
      target: { value: "Тестова покупка" },
    });

    fireEvent.change(screen.getByPlaceholderText("Сума"), {
      target: { value: "200" },
    });

    fireEvent.change(screen.getByDisplayValue("Доходи"), {
      target: { value: "expense" },
    });

    expect(screen.getByDisplayValue("Тестова покупка")).toBeInTheDocument();
    expect(screen.getByDisplayValue("200")).toBeInTheDocument();
    expect(screen.queryByDisplayValue("Фріланс")).not.toBeInTheDocument();
    expect(screen.getByDisplayValue("Їжа")).toBeInTheDocument();
  });

  it("викликає addTransaction при заповненні і сабміті", () => {
    const mockAddTransaction = jest.fn();
    const mockSetModalOpen = jest.fn();

    renderWithContext(<TransactionModal />, {
      isModalOpen: true,
      setModalOpen: mockSetModalOpen,
      addTransaction: mockAddTransaction,
      user: { username: "test" },
    });

    fireEvent.change(screen.getByPlaceholderText("Опис"), {
      target: { value: "Тест" },
    });
    fireEvent.change(screen.getByPlaceholderText("Сума"), {
      target: { value: "123" },
    });

    const submitButton = screen.getByRole("button", {
      name: /додати транзакцію/i,
    });
    fireEvent.click(submitButton);

    expect(mockAddTransaction).toHaveBeenCalledTimes(1);
    expect(mockAddTransaction.mock.calls[0][0]).toMatchObject({
      user: "test",
      amount: 123,
      type: "income",
      description: "Тест",
      category: "Зарплата",
    });
    expect(mockSetModalOpen).toHaveBeenCalledWith(false);
  });
});
