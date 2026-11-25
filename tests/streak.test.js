const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const {
  formatLocalDate,
  addDaysLocal,
  calculateCurrentStreak,
  sortSessionsNewestFirst
} = require("../app.js");

describe("Lógica de fechas y racha del Diario de Estudio", () => {
  it("formatea fechas en hora local sin desplazar por UTC", () => {
    const d = new Date(2026, 10, 24); // 24 de noviembre de 2026 en hora local
    assert.equal(formatLocalDate(d), "2026-11-24");
  });

  it("suma y resta días de calendario correctamente", () => {
    assert.equal(addDaysLocal("2026-11-24", -1), "2026-11-23");
    assert.equal(addDaysLocal("2026-11-24", 1), "2026-11-25");
  });

  it("calcula racha consecutiva terminando hoy y cuenta sesiones múltiples en un día como 1 día", () => {
    const sessions = [
      { date: "2026-11-24", topic: "IA", minutes: 30 },
      { date: "2026-11-24", topic: "Redes", minutes: 20 },
      { date: "2026-11-23", topic: "SDD", minutes: 45 },
      { date: "2026-11-21", topic: "Viejo", minutes: 15 }
    ];
    assert.equal(calculateCurrentStreak(sessions, "2026-11-24"), 2);
  });

  it("mantiene la racha viva si ayer hubo sesión aunque hoy aún no haya registro", () => {
    const sessions = [
      { date: "2026-11-23", topic: "Agentes", minutes: 40 },
      { date: "2026-11-22", topic: "Prompts", minutes: 25 }
    ];
    assert.equal(calculateCurrentStreak(sessions, "2026-11-24"), 2);
  });

  it("ignora fechas futuras al calcular la racha", () => {
    const sessions = [
      { date: "2026-11-24", topic: "Hoy", minutes: 30 },
      { date: "2026-11-25", topic: "Mañana", minutes: 60 }
    ];
    assert.equal(calculateCurrentStreak(sessions, "2026-11-24"), 1);
  });

  it("ordena de más reciente a más antigua sin romperse con registros corruptos", () => {
    const sessions = [
      { date: "2026-11-20", topic: "A", minutes: 10 },
      null,
      { topic: "Sin fecha", minutes: 5 },
      { date: 20261121, topic: "Número", minutes: 5 },
      { date: "2026-02-30", topic: "Inválida", minutes: 5 },
      { date: "2026-11-24", topic: "B", minutes: 20 }
    ];
    const sorted = sortSessionsNewestFirst(sessions);
    assert.deepEqual(sorted.map((s) => s.topic), ["B", "A"]);
  });
});
