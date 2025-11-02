# Read Me First

This document serves as a study guide and quick reference for the core technologies, tools, and best practices used in the Herbarium Frontend application.

## Getting Started

The project was bootstrapped using Vite with the "React + JavaScript + SWC" variant, which is optimized for speed.

### Core Technologies

* **Vite:** The next-generation frontend tooling that provides an extremely fast development server and build tool.
* **React (v18+):** The JavaScript library for building user interfaces.
* **JavaScript (ESNext):** Used as the primary language, leveraging modern features (ES Modules, Async/Await, etc.).
* **JSDoc & Docdash:** Used for generating clean, searchable API documentation directly from your code comments.
* **SWC (Speedy Web Compiler):** Used internally by Vite for blazing-fast compilation and HMR (Hot Module Replacement).

### Commands

| Command | Description |
| :--- | :--- |
| `npm install` | Installs all required dependencies (run after cloning the repo). |
| `npm run dev` | Starts the local development server (with HMR) via Vite. |
| `npm run build` | Compiles the application for production deployment (output is placed in the `dist` folder). |
| `npm run docs` | Generates the JSDoc API documentation using the Docdash theme (output is placed in the `docs` folder). |
| `npm run test` | Executes unit and integration tests (using Jest or Vitest, once configured). |

### Reference Documentation

For further reference and deep dives, please consider the following official documentation:

* [Vite Official Documentation](https://vitejs.dev/guide/)
* [React Documentation (Learning React)](https://react.dev/learn)
* [JSDoc Documentation (Tags and Usage)](https://jsdoc.app/)
* [Docdash Theme (Configuration Options)](https://github.com/clenemt/docdash#options)
* [npm Documentation (Package Management)](https://docs.npmjs.com/)
* [JavaScript (MDN Web Docs)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Vitest (Testing Framework)](https://vitest.dev/)
* [Axios (HTTP Client)](https://axios-http.com/docs/intro)
* [React Router](https://reactrouter.com/home)

### Guides and Topics for Study

The following guides illustrate how to use some features concretely and are essential for improving your mastery of the project's stack:

* **State Management (React Hooks):**
  * [Using the `useState` Hook](https://react.dev/reference/react/useState)
  * [Managing side effects with `useEffect`](https://react.dev/reference/react/useEffect)
  * [Complex State Management with `useReducer`](https://react.dev/reference/react/useReducer)
* **Context & Global State:**
  * [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
* **Component Architecture:**
  * [Thinking in React (The official methodology for building components)](https://react.dev/learn/thinking-in-react)
  * [Separating Concerns (e.g., Presentational vs. Container Components)](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
* **Asynchronous Data Fetching:**
  * [Using `fetch` or Axios for API calls](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
  * [Handling Loading and Error States Gracefully](https://react.dev/learn/responding-to-events#showing-a-different-state-based-on-input)
* **JavaScript Code Documentation:**
  * [Writing effective JSDoc for React Components](https://jsdoc.app/howto-es2015-modules.html)
  * [Documenting Custom Hooks and utility functions](https://jsdoc.app/tags-function.html)

### 😉[BEM Methodology](https://getbem.com/)

**BEM** stands for **Block 🫥 Element 😑 Modifier 😀** - a CSS naming methodology that makes your styles predictable, reusable, and maintainable.

#### BEM Structure

```css
  .block {}
  .block__element {}
  .block--modifier {}
```

#### Examples

```css
/* Traditional CSS (problems: vague, can conflict) */

.header {}
.title {}
.button {}
.button.active {}


/* BEM CSS (clear, specific, no conflicts) */

.registration-form {}
.registration-form__title {}
.registration-form__input {}
.registration-form__input--error {}
.registration-form__button {}
.registration-form__button--disabled {}
```

#### Resources

* [BEM for everyone else](https://iknowdavehouse.medium.com/bem-for-everyone-else-89ccc8ad66f2)
* [BEM documentation](https://en.bem.info/methodology/)
