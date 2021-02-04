// Here are some examples 

let multipleProfiles = {
  client: {
    firstName: "John",
    lastName: "Doe",
  },
  address: {
    street: "221B Baker Street",
    city: "London",
  },
  delivery: {
    package: "ballistic vest",
  },
};

/*
Should be cleaned this way => 
{
  firstName: 'John',
  lastName: "Doe",
  street: "221B Baker Street",
  city: "London",
  package: "ballistic vest",
};
*/ 

let storageHell = [["ballistic vest", "sword"], [], ["IPad", "IPhone"], ["GameBoy color"], ["Nes", "donkey kong 64"], ["hades pc game"], ["Apex Legends Starter Pack", "LG 5K 27p screen"], ["Levi's jean"], ["Coffee Machine", "Azelad"]];
// Should be cleaned this way => ["ballistic vest", "sword", "IPad", "IPhone", "GameBoy color", "Nes", "donkey kong 64", "hades pc game", "Apex Legends Starter Pack", "LG 5K 27p screen", "Levi's jean", "Coffee Machine", "Azelad"]

function employeeProfile() {
  // Code your function here
}

function formatStorage() {
  // Code your function here
}


// Feel free to uncomment those, or even create more to try everything you do :

// console.log(objectParadise(objectHell));
// console.log(arrayParadise(arrayHell));

// Don't modify this, it is for the tests.
module.exports = {
  formatStorage,
  employeeProfile,
};
