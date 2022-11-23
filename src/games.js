const games = [
  {
    name: "Slots1",
    price: 5.62,
    payout: 10.00,
    win_prob: .37,
  },
  
  {
    name: "Slots2",
    price: 50.25,
    payout: 130.00,
    win_prob: .27,
  },
  {
    name: "Slots3",
    price: 220.21,
    payout: 610.00,
    win_prob: .19,
  },
  {
    name: "Blackjack",
    price: 100.33,
    payout: 210.00,
    win_prob: .37,
  },
  {
    name: "Craps",
    price: 5.62,
    payout: 10.00,
    win_prob: .37,
  },
  {
    name: "Roulette",
    price: 50.24,
    payout: 85.00,
    win_prob: .47
  },
  {
    name: "Pachinko",
    price: 5.62,
    payout: 10.00,
    win_prob: .37,
  },
  {
    name: "Pool",
    price: 5.62,
    payout: 30.00,
    win_prob: .07,
  },
  
];

const crypto = require('crypto');

// add id's to starting game array
for (let i = 0; i < games.length; ++i) {
  games[i].id = crypto.randomUUID();
}

module.exports = games;