import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

import Error from './Error';
import Game from './Game';
import Games_log from './Games_log';

import axios from 'axios';

function App() {
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");
  const [games_log, setGames_log] = useState([]);
  const [update, setUpdate] = useState(true);
  const [balance, setBalance] = useState(1000.0);
  

  const fetchGames = async() => {
    try {      
      const response = await axios.get("/api/games");
      setGames(response.data);
    } catch(error) {
      setError("error retrieving games: " + error);
    }
  };
  
  const fetchGames_log = async() => {
    try {      
      const response = await axios.get("/api/games_log");
      setGames_log(response.data);
    } catch(error) {
      setError("error retrieving games log: " + error);
    }
  };
  
  const fetchCurrBalance = async() => {
    try {      
      const response = await axios.get("/api/balance");
      setBalance(response.data[0]);
      return response.data[0];
    } catch(error) {
      setError("error retrieving balance: " + error);
    }
  };
  
  const updateGames_log = async() => {
    setUpdate(true);
    
  };
  
  // fetch ticket data
  useEffect(() => {
    fetchGames();
  },[]);
  
  useEffect(() => {
    if (update) {
      fetchGames_log();
      setUpdate(false);
    }
  },[update]);
  
  return (
    <div className="App">
      <Error error={error} />
      
      <h1>Games</h1>
      {games.map( game => (
        <div key={game.id}>
          <Game game={game} setError={setError} updateGames_log={updateGames_log} fetchCurrBalance={fetchCurrBalance}/>
        </div>
      ))}
      <Games_log array={games_log} games={games} updateGames_log={updateGames_log} fetchCurrBalance={fetchCurrBalance} update={update} balance={balance}/>
      
      
    </div>
  );
}

export default App;
