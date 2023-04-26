// global.js
var tossResult;
export default {
  getTossResult: () => {
    return tossResult;
  },

  setTossResult: (newValue) => {
    tossResult = newValue;
  },
};
