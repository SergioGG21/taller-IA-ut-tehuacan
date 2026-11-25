# Spec 001 Mapa de Calor de Estudio
Estado: borrador

## Contexto y objetivo
Mostrar un mapa de calor de los días estudiados en las últimas semanas para que el estudiante visualice su constancia y la intensidad de su estudio de forma rápida.

## Usuarios
Estudiantes que registran sesiones de estudio en la aplicación.

## Historias de usuario
HU-1. Como estudiante, quiero ver un mapa de calor con los días estudiados para identificar de un vistazo cuándo estudié y con qué intensidad.

## Requisitos funcionales (EARS)
RF-1: CUANDO el usuario abra la aplicación, EL SISTEMA mostrará un mapa de calor con los últimos 28 días hasta la fecha local de hoy.
RF-2: CUANDO existan sesiones en una fecha incluida en el rango, EL SISTEMA mostrará la intensidad del día proporcional al total de minutos acumulados en esa fecha.
RF-3: SI un día del rango no tiene sesiones registradas, ENTONCES EL SISTEMA mostrará ese día sin actividad.
RF-4: SI existen sesiones con fechas futuras respecto a la fecha local de hoy, ENTONCES EL SISTEMA no las contará en el mapa de calor.

## Requisitos no funcionales
- Interfaz y textos en español; diseño adaptable a pantalla móvil y escritorio.

## Casos límite
- Múltiples sesiones en el mismo día suman minutos para ese día.
- Lista de sesiones vacía.
- Fechas inválidas o mal formadas ignoradas sin romper la vista.

## Fuera de alcance
- Filtros por tema o exportación de imágenes en esta primera versión.

## Criterios de finalización
- Funciones puras cubiertas por pruebas con `node --test` en verde y revisión visual en navegador.

## Dudas abiertas
[NECESITA ACLARACIÓN] ¿Qué rangos exactos de minutos definen cada nivel de intensidad?
