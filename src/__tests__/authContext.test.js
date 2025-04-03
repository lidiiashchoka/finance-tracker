import { renderHook, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "../context/AuthContext";

const mockUser = { username: "test", password: "password" };
const mockTransaction = {
  id: "123",
  type: "income",
  amount: 100,
  description: "Зарплата",
  category: "Робота",
  date: new Date().toISOString(),
};

beforeEach(() => {
  jest.spyOn(window, "fetch");
  window.fetch.mockClear();
  localStorage.clear();
});

describe("AuthContext", () => {
  it("логінить користувача", async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ user: mockUser }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login("test", "password");
    });

    expect(result.current.user).toEqual(mockUser);
  });

  it("логаут обнуляє користувача", async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ user: mockUser }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login("test", "password");
    });

    expect(result.current.user).toEqual(mockUser);

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
  });

  it("додає транзакцію", async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ user: mockUser }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login("test", "password");
    });

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ transaction: mockTransaction }),
    });

    await act(async () => {
      await result.current.addTransaction(mockTransaction);
    });

    expect(result.current.transactions).toHaveLength(1);
    expect(result.current.transactions[0].amount).toBe(100);
    expect(result.current.transactions[0].description).toBe("Зарплата");
  });
});
