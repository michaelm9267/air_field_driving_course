// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// jsdom has no layout or scrolling implementation. Browser behavior is checked
// separately; this adapter keeps navigation tests focused on application state.
window.scrollTo = () => {};
