/* global jest */
/**
 * Mock dataLayer
 */
// export default {
//   push: data => data,
// };

export default window.dataLayer = {
  push: jest.fn(),
};

// const dataLayer = {
//   push: data => data,
// };

// module.exports = dataLayer;
