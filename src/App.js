import classes from "./App.module.css";
import { useSelector, useDispatch } from "react-redux";
import { cardsActions } from "./store/card-slice";
import { playersActions } from "./store/players-slice";
import { Route, Routes } from "react-router-dom";
import Game from "./components/Game";
import Start from "./components/Start";
import Scores from "./components/Scores";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showHeading =
    useSelector((state) => state.players.showHeading) ||
    JSON.parse(localStorage.getItem("showHeading"));
  const isPlaying =
    useSelector((state) => state.players.isPlaying) ||
    JSON.parse(localStorage.getItem("isPlaying"));

  const [playerOneName, setPlayerOneName] = useState(null);
  const [playerTwoName, setPlayerTwoName] = useState(null);

  const restartGameHandler = () => {
    dispatch(cardsActions.resetCards());
    dispatch(playersActions.resetScores());
  };

  const shuffleGameHandler = () => {
    dispatch(cardsActions.shuffle());
  };

  const exitGameHandler = () => {
    dispatch(cardsActions.resetCards());
    dispatch(playersActions.resetScores());
    dispatch(playersActions.setIsPlaying(false));
    localStorage.setItem("isPlaying", false);
    navigate("/", { replace: true });
  };

  return (
    <Container fluid className="App">
      <Row>
        <Col md={4}></Col>
        {showHeading && (
          <Col md={4}>
            <div>
              <h1 className={classes.heading}>Memory</h1>
            </div>
          </Col>
        )}
        {isPlaying && (
          <Col md={4}>
            <div className={classes.btnGroup}>
              <button
                className={classes.shuffleBtn}
                onClick={shuffleGameHandler}
              >
                Shuffle
              </button>
              <button
                className={classes.restartBtn}
                onClick={restartGameHandler}
              >
                Restart Game
              </button>
              <button className={classes.exitBtn} onClick={exitGameHandler}>
                Exit Game
              </button>
            </div>
          </Col>
        )}
      </Row>
      <Routes>
        <Route
          path="/"
          element={
            <Start
              onSetPlayerOneName={setPlayerOneName}
              onSetPlayerTwoName={setPlayerTwoName}
            />
          }
        ></Route>
        <Route
          path="/game"
          element={
            <Game
              onRestartGame={restartGameHandler}
              playerOneName={playerOneName}
              playerTwoName={playerTwoName}
            />
          }
        ></Route>
        <Route path="/scores" element={<Scores />}></Route>
      </Routes>
    </Container>
  );
}

export default App;
