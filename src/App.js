import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { cardsActions } from "./store/card-slice";
import Game from "./components/Game";
import Container from "react-bootstrap/Container";
import { useEffect } from "react";

function App() {
  const cards = useSelector((state) => state.cards.cards);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(cardsActions.shuffle());
  }, []);

  return (
    <Container fluid className="App">
      <h1>Memory Game</h1>
      {/* <button>New Game</button> */}
      <Game></Game>
    </Container>
  );
}

export default App;
