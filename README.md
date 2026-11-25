# El Nuevo Profesional de TI: Orquestando IA, Desarrollo y Redes
**Taller práctico — Universidad Tecnológica de Tehuacán**  
**Ponente:** Sergio Eli Guerrero González

Repositorio base para el taller. Aquí trabajamos sobre el proyecto **Diario de Estudio** (HTML, CSS y JS puros, sin dependencias ni servidor) para practicar:
- Reglas persistentes y memoria (`AGENTS.md`, `MEMORY.md`).
- *Harness engineering* avanzado (comandos, skills, MCP y multiagentes).
- *Spec-Driven Development* (SDD) con sintaxis EARS y pruebas con `node --test`.

## Requisitos
- Navegador moderno (la app no necesita nada más).
- **Node.js 18+** para las pruebas (`node --test`).
- **OpenCode V2** para la parte de agentes: los agentes de `.opencode/agents/` usan `permissions`, `shell` y `subagent`, y `opencode.json` usa `mcp.servers`. En V1 esas claves no se aplican y los agentes quedarían sin restricciones.
- El MCP `chrome-devtools` se descarga con `npx` la primera vez y necesita Google Chrome instalado. Es una herramienta del agente, no una dependencia de la app.

## Estructura
```
.agents/skills/     local-dates, sdd
.opencode/          commands/ (/feature, /sdd-*) y agents/ (coordinator, planner, implementer, reviewer)
AGENTS.md           contrato del proyecto
MEMORY.md           memoria entre sesiones
docs/constitution.md
specs/001-heat-map/ spec, plan y tareas (bloqueados hasta resolver la aclaración)
tests/              pruebas con node --test
opencode.json       servidor MCP chrome-devtools
```

## Cómo empezar rápido
1. Clona o descarga este repositorio.
2. Abre `index.html` con doble clic en tu navegador para ver la base funcionando.
3. Si vas a correr pruebas unitarias de lógica, asegúrate de tener **Node.js** instalado y ejecuta:
   ```bash
   node --test
   ```
