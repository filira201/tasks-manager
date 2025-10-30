import { describe, expect, test } from "vitest";

import { formatToClientDate } from "../formatDate";

describe("форматирование даты для клиента (formatToClientDate)", () => {
  test("если дата не передана, то функция должна вернуть пустую строку", () => {
    // Подготовка, её нет, потому что функция не принимает аргументов

    // Действие
    const result = formatToClientDate();

    // Проверка
    expect(result).toBe("");
  });

  test("если передана пустая строка, то функция должна вернуть пустую строку", () => {
    // Подготовка
    const testData = "";

    // Действие
    const result = formatToClientDate(testData);

    // Проверка
    expect(result).toBe("");
  });

  test("если передана валидная дата с временем, то функция должна вернуть отформатированную дату", () => {
    // Подготовка
    const testDate = "2024-01-15T10:30:00.000Z";

    // Действие
    const result = formatToClientDate(testDate);

    // Проверка - результат соответствует локальному формату даты
    expect(result).toMatch("15.01.2024");
  });

  test("если передана дата без времени, то функция должна вернуть строку с датой", () => {
    // Подготовка
    const testDate = "2024-12-25";

    // Действие
    const result = formatToClientDate(testDate);

    // Проверка
    expect(result).toBe("25.12.2024");
  });

  test("если передана дата в ISO формате, то функция должна вернуть непустую строку", () => {
    // Подготовка
    const testDate = new Date("2024-06-15").toISOString();

    // Действие
    const result = formatToClientDate(testDate);

    // Проверка
    expect(result).toBe("15.06.2024");
  });
});
