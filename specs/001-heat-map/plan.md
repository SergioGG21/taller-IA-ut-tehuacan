# Plan — Spec 001 Mapa de Calor de Estudio
Estado: bloqueado. No se implementa hasta resolver el [NECESITA ACLARACIÓN] de `spec.md` y aprobar la spec.

## Archivos y responsabilidades
- `app.js`: agregar función pura para construir los datos del mapa de calor y función de renderizado en `index.html`.
- `index.html`: contenedor para el mapa de calor.
- `styles.css`: estilos de cuadrícula y niveles de intensidad.
- `tests/streak.test.js`: pruebas unitarias con `node --test`.

## Funciones puras
- `buildHeatMapDays(sessions, todayStr, daysCount = 28)`: recibe `todayStr` como parámetro y devuelve arreglo ordenado de `{ date, minutes, level }`.

## Algoritmo en pseudocódigo
1. Validar `todayStr`; si no es válido, devolver `[]`.
2. Agrupar minutos por `date` válida con `date <= todayStr`.
3. Generar los últimos `daysCount` días terminando en `todayStr` usando aritmética de calendario local.
4. Mapear minutos totales a nivel (`0` sin minutos, `1` bajo, `2` medio, `3` alto).

## Estrategia de tests con `node --test`
- Probar día sin actividad, múltiples sesiones mismo día, ignorar fechas futuras y respetar `todayStr`.
