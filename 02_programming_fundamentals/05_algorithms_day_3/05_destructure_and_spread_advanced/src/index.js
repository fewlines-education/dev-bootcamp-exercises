// Here are some examples 

const multipleProfiles = {
  customer: {
    firstName: "Mrs",
    lastName: "Doubtfire",
    address: {
      street: "520-522 Green Street ",
      city: "San Francisco",
    },
  },
  delivery: {
    item: "Water bottles",
    address: {
      street: "2640 Steiner Street",
      city: "San Francisco",
    },
  },
}

/*
Should be cleaned this way => 
{
  firstName: 'Mrs',
  lastName: 'Doubtfire',
  address: { street: '2640 Steiner Street', city: 'San Francisco' },
  item: 'Water bottles'
}
*/ 

let storageHell = [["ballistic vest", "sword"], [], ["IPad", "IPhone"], ["GameBoy color"], ["Nes", "donkey kong 64"], ["hades pc game"], ["Apex Legends Starter Pack", "LG 5K 27p screen"], ["Levi's jean"], ["Coffee Machine", "Azelad"]];
// Should be cleaned this way => ["ballistic vest", "sword", "IPad", "IPhone", "GameBoy color", "Nes", "donkey kong 64", "hades pc game", "Apex Legends Starter Pack", "LG 5K 27p screen", "Levi's jean", "Coffee Machine", "Azelad"]

function customerProfile() {
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
  customerProfile,
};
