(function (root) {
  const STORAGE_KEY = "diario-estudio-sesiones";

  function padTwo(num) {
    return String(num).padStart(2, "0");
  }

  function formatLocalDate(dateObj) {
    const year = dateObj.getFullYear();
    const month = padTwo(dateObj.getMonth() + 1);
    const day = padTwo(dateObj.getDate());
    return `${year}-${month}-${day}`;
  }

  function parseLocalDate(dateStr) {
    if (typeof dateStr !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return null;
    }
    const [year, month, day] = dateStr.split("-").map(Number);
    const parsed = new Date(year, month - 1, day);
    if (
      parsed.getFullYear() !== year ||
      parsed.getMonth() !== month - 1 ||
      parsed.getDate() !== day
    ) {
      return null;
    }
    return parsed;
  }

  function addDaysLocal(dateStr, deltaDays) {
    const base = parseLocalDate(dateStr);
    if (!base) return null;
    const next = new Date(base.getFullYear(), base.getMonth(), base.getDate() + deltaDays);
    return formatLocalDate(next);
  }

  function calculateCurrentStreak(sessions, todayStr) {
    const todayDate = parseLocalDate(todayStr);
    if (!todayDate || !Array.isArray(sessions)) return 0;

    const validDates = new Set();
    for (const item of sessions) {
      if (!item || typeof item.date !== "string") continue;
      if (item.date > todayStr) continue; // Fechas futuras no suman
      if (parseLocalDate(item.date)) {
        validDates.add(item.date);
      }
    }

    let anchorDate = null;
    if (validDates.has(todayStr)) {
      anchorDate = todayStr;
    } else {
      const yesterdayStr = addDaysLocal(todayStr, -1);
      if (yesterdayStr && validDates.has(yesterdayStr)) {
        anchorDate = yesterdayStr;
      }
    }

    if (!anchorDate) return 0;

    let streak = 0;
    let cursor = anchorDate;
    while (validDates.has(cursor)) {
      streak += 1;
      cursor = addDaysLocal(cursor, -1);
    }

    return streak;
  }

  function sortSessionsNewestFirst(sessions) {
    if (!Array.isArray(sessions)) return [];
    return [...sessions].sort((a, b) => {
      if (a.date !== b.date) {
        return b.date.localeCompare(a.date);
      }
      return 0;
    });
  }

  const logicApi = {
    STORAGE_KEY,
    formatLocalDate,
    parseLocalDate,
    addDaysLocal,
    calculateCurrentStreak,
    sortSessionsNewestFirst
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = logicApi;
  }

  if (root && typeof root.document !== "undefined") {
    root.StudyDiaryLogic = logicApi;

    function loadSessions() {
      try {
        const raw = root.localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      } catch (_err) {
        return [];
      }
    }

    function saveSessions(sessions) {
      root.localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    }

    function renderApp() {
      const todayStr = formatLocalDate(new Date());
      const dateInput = root.document.getElementById("session-date");
      const streakEl = root.document.getElementById("current-streak");
      const listEl = root.document.getElementById("sessions-list");

      if (dateInput && !dateInput.value) {
        dateInput.value = todayStr;
      }

      const sessions = loadSessions();
      const streak = calculateCurrentStreak(sessions, todayStr);
      if (streakEl) {
        streakEl.textContent = `${streak} ${streak === 1 ? "día" : "días"}`;
      }

      if (listEl) {
        listEl.innerHTML = "";
        const sorted = sortSessionsNewestFirst(sessions);
        if (sorted.length === 0) {
          const empty = root.document.createElement("li");
          empty.className = "session-meta";
          empty.textContent = "Aún no hay sesiones registradas.";
          listEl.appendChild(empty);
          return;
        }

        for (const s of sorted) {
          const li = root.document.createElement("li");
          li.className = "session-item";

          const title = root.document.createElement("strong");
          title.textContent = s.topic;

          const meta = root.document.createElement("span");
          meta.className = "session-meta";
          meta.textContent = `${s.date} · ${s.minutes} min`;

          li.appendChild(title);
          li.appendChild(meta);
          listEl.appendChild(li);
        }
      }
    }

    root.document.addEventListener("DOMContentLoaded", () => {
      renderApp();

      const form = root.document.getElementById("session-form");
      const msgEl = root.document.getElementById("form-message");
      if (!form) return;

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const dateVal = root.document.getElementById("session-date").value;
        const topicVal = root.document.getElementById("session-topic").value.trim();
        const minutesVal = Number(root.document.getElementById("session-minutes").value);

        if (!parseLocalDate(dateVal) || !topicVal || !Number.isFinite(minutesVal) || minutesVal <= 0) {
          if (msgEl) msgEl.textContent = "Revisa la fecha, el tema y que los minutos sean mayores a 0.";
          return;
        }

        const sessions = loadSessions();
        sessions.push({
          date: dateVal,
          topic: topicVal,
          minutes: minutesVal
        });
        saveSessions(sessions);

        root.document.getElementById("session-topic").value = "";
        root.document.getElementById("session-minutes").value = "";
        if (msgEl) msgEl.textContent = "Sesión guardada.";
        renderApp();
      });
    });
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
