# TODO

## Cleanup

- [ ] - Consolidate colour pallettes used across the project. CSS files -> into `tailwind.config.ts`
- [ ] - Ensure all base `page.tsx` files and any potential `layout.tsx` files are _**NOT**_ marked as 'use client', unless _absolutely_ necessary. (Even then we should be moving the state reliance to child components)
- [ ] - Remove or simplify similar or duplicate (mostly inline) funcitons where possible to `lib/` or `hooks/` as semi-generic implementations.

- [ ] - Consolidate repeat or ad-hoc types into the `types/` directory.
- [ ] - Take consolidated types and remove type duplication. Prefer moving into simple, but generic types/interfaces.

## Features

- [ ] - Use-Cases for Server Actions where possible.
- [ ] -

## External

- [ ] -

## Internal

- [ ] -

---

The below doesn't take into account that I would want to entirely refactor/rewrite the way we are the (handling uploads + Process Picker) behaviour, but is a good start

# Analysis output

Based on my analysis of the codebase, I've identified several architectural and code quality issues that impact maintainability, modularity, and overall design. I'll organize my findings according to the focus areas you specified, providing constructive feedback with specific examples and improvement suggestions.

## Architectural Boundaries

**Issue**: The Zustand store (`src/store/store.ts`) directly manipulates browser APIs (URL search params and history) and handles both state management and side effects. This creates tight coupling between state logic and browser-specific concerns.

**Suggestions**:

- Extract URL manipulation into a separate service or utility (e.g., `src/lib/url-utils.ts`)
- Consider using a router-based state management approach instead of manual URL syncing
- Implement a boundary layer that separates state management from side effects

**Issue**: The upload system has scattered concerns across multiple hooks and actions, with tight coupling between client-side state and server-side processing.

**Suggestions**:

- Create clear boundaries between upload UI logic, state management, and file processing
- Implement an upload service layer that abstracts file operations from React hooks

## Cross-Cutting Concerns

**Issue**: Logging is scattered throughout the codebase using `console.log` and `console.error` directly in components, actions, and utilities. This makes it difficult to:

- Change logging levels
- Add structured logging
- Centralize log management
- Test logging behavior

**Found in**: `src/actions/upload.ts`, `src/app/api/uploads/route.ts`, `src/app/internal/dashboard/create-news/actions.ts`, etc.

**Suggestions**:

- Implement a centralized logging utility (e.g., `src/lib/logger.ts`) with configurable levels
- Use a logging library like `winston` or `pino` for production-ready logging
- Create logging middleware for server actions

**Issue**: Error handling patterns are inconsistent. Some places return error objects, others throw exceptions, and logging is mixed with error handling logic.

**Suggestions**:

- Standardize error handling with custom error classes (e.g., `ValidationError`, `UploadError`)
- Implement error boundaries in React components
- Create a centralized error reporting system

## Open-Closed Principle Violations

**Issue**: The `ProcessPicker` component (`src/app/(external)/upload-portal/_components/ProcessPicker.tsx`) handles form validation, dropdown rendering, state management, and URL syncing all in one component. Adding new picker types would require modifying this component.

**Suggestions**:

- Extract form logic into a reusable `usePickerForm` hook
- Create a generic `DropdownPicker` component that accepts configuration
- Separate validation logic into schema-based validators

**Issue**: The `CreateNewsForm` component uses plain `useState` for form management instead of `react-hook-form`, making it harder to extend with validation or new fields.

**Suggestions**:

- Migrate to `react-hook-form` with Zod validation schemas
- Extract form configuration into separate config objects

## Single Responsibility Principle Violations

**Issue**: The `useFileUpload` hook (`src/hooks/upload/index.ts`) manages file state, progress tracking, upload handling, and process selection. It orchestrates multiple concerns within a single hook.

**Suggestions**:

- Split into focused hooks: `useFileState`, `useUploadProgress`, `useFileProcessor`
- Create a composite hook that combines simpler hooks for complex use cases

**Issue**: The `uploadFiles` action (`src/actions/upload.ts`) handles validation, file processing, storage, and logging all in one function.

**Suggestions**:

- Extract validation into a separate `validateUpload` function
- Create a `FileStorageService` class for storage operations
- Separate logging concerns from business logic

## Dependency Inversion Issues

**Issue**: Upload hooks are tightly coupled to the Zustand store and each other. The `useFileUpload` hook directly imports and uses `useUploadStore`, making it difficult to test or replace the state management solution.

**Suggestions**:

- Accept store/state as parameters or through dependency injection
- Create interfaces for state management (e.g., `ProcessSelector`, `FileManager`)
- Implement adapter patterns to decouple from specific implementations

**Issue**: File processing logic is scattered across hooks and actions, with direct dependencies on file system operations.

**Suggestions**:

- Define interfaces for file operations (e.g., `FileProcessor`, `StorageAdapter`)
- Allow dependency injection of storage implementations for easier testing and flexibility

## Interfaces and Types

**Strength**: The codebase has good type organization with dedicated `types/` directory and proper interface definitions.

**Issue**: Some type duplication exists. For example, color-related types are defined both in `globals.css` (as CSS variables) and potentially in component props.

**Suggestions**:

- Consolidate color definitions into a single source of truth (preferably `tailwind.config.ts`)
- Create more generic, reusable type utilities (e.g., `ApiResponse<T>`, `FormField<T>`)
- Use discriminated unions for better type safety in state management

## Functional Programming Opportunities

**Strength**: Good use of `map`, `filter`, and `reduce` throughout the codebase. The `stats-overview-config.ts` demonstrates functional composition well.

**Issue**: Some components still use imperative patterns. For example, the `CreateNewsForm` uses multiple `useState` calls instead of a single state object or reducer.

**Suggestions**:

- Replace multiple related `useState` calls with `useReducer` for complex state
- Use functional composition for data transformations (e.g., in config generation functions)
- Implement more pure functions for business logic, separating them from side effects

## Additional Cleanup Opportunities

Based on the TODO.md file, here are the key cleanup tasks that align with the architectural concerns:

1. **Color Palette Consolidation**: Move all color definitions from `globals.css` into `tailwind.config.ts` to eliminate duplication
2. **Server Component Migration**: Ensure all page components are server components where possible
3. **Function Consolidation**: Extract inline functions into reusable utilities in `lib/` or `hooks/`
4. **Type Deduplication**: Review and consolidate similar types across the codebase

## Priority Recommendations

1. **High Priority**: Implement centralized logging and error handling
2. **High Priority**: Consolidate color definitions and remove CSS duplication
3. **Medium Priority**: Refactor tightly coupled hooks using dependency inversion
4. **Medium Priority**: Split components violating SRP into smaller, focused components
5. **Low Priority**: Enhance functional programming patterns where beneficial

These changes would significantly improve the codebase's maintainability, testability, and extensibility while following SOLID principles and modern React/Next.js best practices.
