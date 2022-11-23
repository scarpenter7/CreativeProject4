const axios = require("axios");

const games = require("./games.js");

const baseURL = "http://localhost:3000";

games.forEach(async (game) => {
  const response = await axios.post(`${baseURL}/api/games`, game);
  if (response.status != 200)
    console.log(`Error adding ${game.name}, code ${response.status}`);
});
