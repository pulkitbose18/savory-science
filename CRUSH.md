# CRUSH.md - Project Guidelines

This document outlines essential commands and code style guidelines for agents working in this repository.

## Commands

- **Build:** `npm run build`
- **Develop:** `npm run dev`
- **Lint:** `npm run lint`
- **Test:** No explicit test command is configured in `package.json`. If tests are added, please update this section.

## Code Style Guidelines (JavaScript/React)

- **Linter:** ESLint is configured with recommended rules for JavaScript, React Hooks, and React Refresh.
- **ECMAScript Version:** ES2020
- **JSX:** Used for React components.
- **Modules:** ES Modules (`type: "module"` in `package.json`).
- **Naming Conventions:**
    - Components and React-related variables should follow PascalCase or camelCase.
    - Unused variables are an error, except for those starting with an uppercase letter or underscore (e.g., `_UNUSED_VAR`, `ComponentA`).
- **Imports:** Standard ES module imports.
- **Formatting:** Handled by ESLint.
- **Types:** No explicit type checking is configured (e.g., TypeScript).
- **Error Handling:** Follow standard JavaScript error handling practices (try/catch, etc.).
