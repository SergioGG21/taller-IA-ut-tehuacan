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

## Con qué agente trabajar
El repo trae la configuración para **dos agentes**. Usa el que tengas; las reglas (`AGENTS.md`), la memoria, las specs y las pruebas son las mismas.

| Pieza | OpenCode | Claude Code (VS Code o terminal) |
| --- | --- | --- |
| Reglas | `AGENTS.md` | `CLAUDE.md`, que importa `AGENTS.md` y `MEMORY.md` |
| Skills | `.agents/skills/` | `.claude/skills/` (copia; si cambias una, cambia la otra) |
| Comandos | `.opencode/commands/` | `.claude/commands/` |
| Agentes | `.opencode/agents/` | `.claude/agents/` |
| MCP | `opencode.json` | `.mcp.json` |
| Permisos | frontmatter de cada agente | `.claude/settings.json` + `tools` de cada agente |

### Notas para Claude Code
- Los comandos se usan igual: `/feature ...`, `/sdd-plan 001-heat-map`, `/sdd-implement 001-heat-map T1`.
- `.claude/settings.json` **bloquea** `npm`, `npx`, `yarn`, `pnpm` y `bun` en la terminal: la regla "nunca añadir dependencias" deja de depender de que el modelo obedezca.
- La primera vez, Claude Code pide aprobar el MCP `chrome-devtools` de `.mcp.json`.
- Para el flujo multiagente, el coordinador debe ser el agente principal. Eso se hace desde la terminal con `claude --agent coordinator` (requiere instalar el CLI de Claude Code; la extensión de VS Code no lo agrega a la terminal).
- En Claude Code el `planner` no tiene un permiso que lo limite a `specs/`: esa restricción va en su prompt. Es un buen ejemplo de la diferencia entre una regla y un permiso.

## Estructura
```
.agents/skills/     local-dates, sdd (OpenCode)
.claude/            skills, commands, agents y settings.json (Claude Code)
CLAUDE.md           entrada de Claude Code; importa AGENTS.md y MEMORY.md
.mcp.json           servidor MCP chrome-devtools (Claude Code)
.opencode/          commands/ (/feature, /sdd-*) y agents/ (coordinator, planner, implementer, reviewer)
AGENTS.md           contrato del proyecto
MEMORY.md           memoria entre sesiones
docs/constitution.md
specs/001-heat-map/ spec, plan y tareas (bloqueados hasta resolver la aclaración)
tests/              pruebas con node --test
opencode.json       servidor MCP chrome-devtools (OpenCode)
```

## Cómo empezar rápido
1. Clona o descarga este repositorio.
2. Abre `index.html` con doble clic en tu navegador para ver la base funcionando.
3. Si vas a correr pruebas unitarias de lógica, asegúrate de tener **Node.js** instalado y ejecuta:
   ```bash
   node --test
   ```
