# MEMORY.md Diario de Estudio
Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no aporte.

## Estado actual
Base v1 lista para el taller: registrar sesiones (fecha, tema, minutos), racha actual y lista de sesiones persistidas en `localStorage`.

## Decisiones (y por qué)
- Sin backend ni dependencias: cualquiera debe poder abrir `index.html` con doble clic.
- Fecha editable en el formulario: permite registrar días pasados y probar rachas.
- Fechas en hora local (`AAAA-MM-DD`): evita desplazamientos por UTC.

## Aprendizajes y errores a evitar
- Nunca usar `toISOString()` ni `new Date("AAAA-MM-DD")` para fechas locales.
- Nunca calcular días sumando `86400000` ms por cambios de horario.

## Próximos pasos
- Trabajar en la spec `001-heat-map` y practicar el flujo SDD con pruebas en `node --test`.
