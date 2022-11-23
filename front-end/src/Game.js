import axios from 'axios';

export default function Product(props) {

  const addOneTogames_log = async(id) => {
    await axios.post("/api/games_log/" + id);
    props.fetchCurrBalance();
    props.updateGames_log();

  };

  return (
    <div>
        <p>{props.game.name}, Price: ${props.game.price}, Winning Payout: ${props.game.payout}</p>
        <button onClick={e => addOneTogames_log(props.game.id)}>Play Game!</button>
    </div>
  );
}

