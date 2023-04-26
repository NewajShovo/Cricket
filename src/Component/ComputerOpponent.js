// global.js
let countDeliveries = 1;
let player1Move, computerMove, totalRunForPlayer1, totalRunForComputer;

export default {
  getnumberOfDeliveries: () => {
    return countDeliveries;
  },

  setnumberOfDeliveries: (newValue) => {
    countDeliveries = newValue;
  },

  resetState: () => {
    countDeliveries = 1;
    player1Move = 0;
    computerMove = 0;
    totalRunForComputer = 0;
    totalRunForPlayer1 = 0;
  },

  getplayer1Move: () => {
    return player1Move;
  },

  setplayer1Move: (newValue) => {
    player1Move = newValue;
  },

  getcomputerMove: () => {
    return computerMove;
  },

  setcomputerMove: (newValue) => {
    computerMove = newValue;
  },

  gettotalRunForPlayer1: () => {
    return totalRunForPlayer1;
  },

  settotalRunForPlayer1: (newValue) => {
    totalRunForPlayer1 = newValue;
  },

  gettotalRunForComputer: () => {
    return totalRunForPlayer1;
  },

  settotalRunForComputer: (newValue) => {
    totalRunForPlayer1 = newValue;
  },
};
