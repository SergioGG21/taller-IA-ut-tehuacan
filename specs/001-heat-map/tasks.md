# Tareas — Spec 001 Mapa de Calor de Estudio
Estado: bloqueado (depende de la aclaración de niveles de intensidad en `spec.md`).

- [ ] **T1. Función pura `buildHeatMapDays` con pruebas en `node --test`.** RF-1, RF-2, RF-3, RF-4
  Hecho cuando: existen pruebas en `tests/` y `node --test` pasa en verde.
- [ ] **T2. Contenedor y estilos del mapa de calor en `index.html` y `styles.css`.** RF-1, RF-2, RF-3
  Hecho cuando: el contenedor se ve correctamente en escritorio y móvil sin romper el diseño actual.
- [ ] **T3. Renderizado del mapa de calor en `app.js`.** RF-1, RF-2, RF-3, RF-4
  Hecho cuando: al cargar o registrar una sesión, el mapa de calor actualiza los días y niveles según `todayStr`.
