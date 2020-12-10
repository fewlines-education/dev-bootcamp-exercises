// Here are some examples 
let arrayHell = [[2, 3], [], [1, 1], [8], [2, 4], [8], [1, 1, 12]];
// Should be cleaned this way => [2, 3, 1, 1, 8, 2, 4, 8, 1, 1, 12]

let objectHell = {
  objectHell1: {
    name: "John",
    password: "123123",
    admin: true,
  },
  objectHell2: {
    cpuThreads: 2,
  },
  objectHell3: {
    ramGB: 16,
  },
};
// Should be cleaned this way => 
/*
{ 
  name: "John", 
  password: 123123,
  admin: true,
  CPUThreads: 2, 
  RamGB: 16
};
*/ 

function objectParadise() {
  // Code your function here
}

function arrayParadise() {
  // Code your function here
}



// Don't modify this, it is for the tests.
module.exports = {
  arrayHell,
  objectHell,
  arrayParadise,
  objectParadise,
};
