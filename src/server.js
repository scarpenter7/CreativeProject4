const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
let games = require('./games');
const app = express();
let games_log = [];
let curr_balance = [1000.0];


// Mongoose setup
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// Parse application/json
app.use(bodyParser.json());


const balanceSchema = new mongoose.Schema({
  amount: Number,
});

const Balance = mongoose.model('Balance', balanceSchema);


// Add game to games list
app.post('/api/games', (req, res) => {
  let game_id = crypto.randomUUID();
  let game = {
    name: req.body.name,
    id: game_id,
    price: req.body.price,
    payout: req.body.payout,
    win_prob: req.body.win_prob,
  };
  games.push(game);
  res.send(game);
});

// Add game to games_log and play that game
app.post('/api/games_log/:id', (req, res) => {
    let id = req.params.id;
    let game = games_log.find(element => element.id === id);
    if (game === undefined) { // create new game in games_log
        game = {
            id: id,
            quantity: 1
        };
        games_log.push(game);
    }
    else { // update quantity
        game.quantity++;
    }
    
    // Play game!
    let game_info = games.find(element => element.id === id);
    let balance = await Balance.findOneAndUpdate({}, {amount: Balance.amount - game_info.price});
    balance -= parseFloat(game_info.price);

    if (Math.random() < parseFloat(game_info.win_prob)) {
      curr_balance[0] += game_info.payout;
    }
    
    res.send(game);
});

/*app.get('/api/balance', (req, res) => {
  res.send(curr_balance);
});*/

app.get('/api/balance', async (req, res) => {
  try {
    let balance = await Balance.find()[0]["amount"];
    res.send([balance]);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/balance', async (req, res) => {
    const balance = new Balance({
    amount: 1000,
  });
  try {
    await balance.save();
    res.send({balance:balance});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get list of all games
app.get('/api/games', (req, res) => {
  res.send(games);
});

// Get a game by ID
app.get('/api/games/:id', (req, res) => {
  let id = req.params.id;
  let game = games.find(element => element.id === id);
  res.send(game);
});

// Get a list of games done in games_log
app.get('/api/games_log', (req, res) => {
  res.send(games_log);
});


// Adjust quantity of games done in games_log
app.put('/api/games_log/:id/:quantity', (req, res) => {
  let id = req.params.id;
  let new_quantity = parseInt(req.params.quantity);
  
  let game = games_log.find(element => element.id === id);
  if (game === undefined) { // create new game in games_log
    res.sendStatus(404);
  }
  else {
    if (new_quantity > 0) {
        game.quantity = new_quantity;
    }
    else { // remove from games_log if quantity
        games_log = games_log.filter(game => game.id !== id);
    }
    res.send(game);
  }
  
});

// Delete functions
app.delete('/api/games/:id', (req, res) => {
  let id = req.params.id;
  games = games.filter(game => game.id !== id);
  res.sendStatus(200);
});

app.delete('/api/games_log/:id', (req, res) => {
  let id = req.params.id;
  games_log = games_log.filter(game => game.id !== id);
  res.sendStatus(200);
});


app.listen(3000, () => console.log('Server listening on port 3000!'));