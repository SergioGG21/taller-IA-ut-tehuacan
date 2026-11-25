# MEMORY.md Diario de Estudio
Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no aporte.

## Estado actual
Base v1 lista para el taller: registrar sesiones (fecha, tema, minutos), racha actual y lista de sesiones persistidas en `localStorage`.

## Decisiones (y por qué)
- Sin backend ni dependencias: cualquiera debe poder abrir `index.html` con doble clic.
- Fecha editable en el formulario: permite registrar días pasados y probar rachas.
- Fechas en hora local (`AAAA-MM-DD`): evita desplazamientos por UTC.
- La lista ignora registros sin fecha válida: un dato corrupto en `localStorage` no rompe la vista.
- MCP `chrome-devtools` en `opencode.json` (V2): herramienta del agente, no dependencia del proyecto.
- Soporte doble: OpenCode (`.opencode/`, `.agents/`) y Claude Code (`.claude/`, `CLAUDE.md`, `.mcp.json`). `AGENTS.md` es la única fuente de reglas.
- Plan y tareas de `001-heat-map` quedan bloqueados a propósito hasta resolver la aclaración.

## Aprendizajes y errores a evitar
- Nunca usar `toISOString()` ni `new Date("AAAA-MM-DD")` para fechas locales.
- Nunca calcular días sumando `86400000` ms por cambios de horario.

## Próximos pasos
- Resolver el [NECESITA ACLARACIÓN] de `001-heat-map`, aprobar la spec y luego trabajar en ella y practicar el flujo SDD con pruebas en `node --test`.
