import axios from 'axios';

export default function Games_log(props) {
  
  const addOneToGames_log = async(id) => {
    await axios.post("/api/games_log/" + id);
    props.fetchCurrBalance();
    props.updateGames_log();
  };
  
  const removeFromGames_log = async(id) => {
    await axios.delete("/api/games_log/" + id);
    props.updateGames_log();
  };
    
    
  return (
    <div>
        <h1>Your Current Balance: ${Math.round(props.balance).toFixed(2)}</h1>
        <h1>Your Past Games</h1>
        {props.array.map( game => (
            <div key={game.id}>
            
              {props.games.find(element => element.id === game.id).name}, {game.quantity}
              <button onClick={e => addOneToGames_log(game.id)}>Play Again!</button>
              <button onClick={e => removeFromGames_log(game.id)}>Remove from Game Log</button>
              
            </div>
        ))}

    </div>
  );
}

