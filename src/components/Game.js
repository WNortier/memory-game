import { React, useState, useEffect } from "react";
import classes from "./Game.module.css";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { cardsActions } from "../store/card-slice";
import { playersActions } from "../store/players-slice";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

const Game = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const playerOneName = useSelector((state) => state.players.playerOneName);
  const playerTwoName = useSelector((state) => state.players.playerTwoName);

  const playerOneScore = useSelector((state) => state.players.playerOneScore);
  const playerTwoScore = useSelector((state) => state.players.playerTwoScore);
  const player = useSelector((state) => state.players.player);
  const cards = useSelector((state) => state.cards.cards);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  // let [playerOneScore, setPlayerOneScore] = useState(0);
  // let [playerTwoScore, setPlayerTwoScore] = useState(0);
  // const [player, setPlayer] = useState({ playing: "playerOne" });

  const choiceHandler = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (
        choiceOne.value === choiceTwo.value &&
        choiceOne.color === choiceTwo.color &&
        choiceOne.suit !== choiceTwo.suit
      ) {
        const setMatchedChoiceOne = cards.map((card) => {
          if (card.id === choiceOne.id) {
            return { ...card, matched: true };
          } else {
            return card;
          }
        });
        const setMatchedChoiceTwo = setMatchedChoiceOne.map((card) => {
          if (card.id === choiceTwo.id) {
            return { ...card, matched: true };
          } else {
            return card;
          }
        });
        setTimeout(() => {
          dispatch(cardsActions.update(setMatchedChoiceTwo));
        }, 1250);
        if (player === "playerOne") {
          // setPlayerOneScore((prevScore) => prevScore + 1);
          dispatch(playersActions.addScorePlayerOne());
          dispatch(playersActions.setPlayerTwoPlaying());
          // setPlayer({ playing: "playerTwo" });
        } else {
          dispatch(playersActions.addScorePlayerTwo());
          // setPlayerTwoScore((prevScore) => prevScore + 1);
          // setPlayer({ playing: "playerOne" });
          dispatch(playersActions.setPlayerOnePlaying());
        }
        setTimeout(() => {
          resetRound();
        }, 1250);
      } else {
        if (player === "playerOne") {
          // setPlayer({ playing: "playerTwo" });
          dispatch(playersActions.setPlayerTwoPlaying());
        } else {
          dispatch(playersActions.setPlayerOnePlaying());
        }
        setTimeout(() => {
          resetRound();
        }, 1250);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (playerOneScore + playerTwoScore === 27) {
      dispatch(cardsActions.resetCards());
      dispatch(playersActions.setIsPlaying(false));
      localStorage.setItem("isPlaying", false);
      navigate("/scores", { replace: true });
    }
  }, [choiceOne, choiceTwo]);

  const resetRound = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  return (
    <Row>
      <Col md={3}>
        <h3>{playerOneName}</h3>
        <p>{playerOneScore}</p>
        {player === "playerOne" && <p>It's your turn</p>}
      </Col>
      <Col md={6} className={classes.deck}>
        {cards.map((card) => {
          return (
            <Card
              key={card.id}
              card={card}
              choiceHandler={choiceHandler}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
            />
          );
        })}
      </Col>
      <Col md={3}>
        <h3>{playerTwoName}</h3>
        <p>{playerTwoScore}</p>
        {player === "playerTwo" && <p>It's your turn</p>}
      </Col>
    </Row>
  );
};

export default Game;
