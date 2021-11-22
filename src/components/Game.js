import { React, useState, useEffect } from "react";
import classes from "./Game.module.css";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { cardsActions } from "../store/card-slice";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Game = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.cards);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  let [playerOneScore, setPlayerOneScore] = useState(0);
  let [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [player, setPlayer] = useState({ playing: "playerOne" });

  const choiceHandler = (card) => {
    // console.log(card);
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (
        choiceOne.value === choiceTwo.value &&
        choiceOne.color === choiceTwo.color
      ) {
        const updateChoiceOne = cards.map((card) => {
          if (card.id === choiceOne.id) {
            return { ...card, matched: true };
          } else {
            return card;
          }
        });
        const updateChoiceTwo = updateChoiceOne.map((card) => {
          if (card.id === choiceTwo.id) {
            return { ...card, matched: true };
          } else {
            return card;
          }
        });
        dispatch(cardsActions.remove(updateChoiceTwo));
        //dispatch(cardsActions.remove(choiceTwo));
        if (player.playing === "playerOne") {
          setPlayerOneScore((prevScore) => prevScore + 1);
          setPlayer({ playing: "playerTwo" });
        } else {
          setPlayerTwoScore((prevScore) => prevScore + 1);
          setPlayer({ playing: "playerOne" });
        }
        resetRound();
      } else {
        console.log("those cards don't match");
        if (player.playing === "playerOne") {
          setPlayer({ playing: "playerTwo" });
        } else {
          setPlayer({ playing: "playerOne" });
        }
        resetRound();
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetRound = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  return (
    <Row>
      <Col md={3}>
        <h3>Player1</h3>
        <p>{playerOneScore}</p>
        {player.playing === "playerOne" && <p>It's your turn</p>}
      </Col>
      <Col md={6}>
        {cards.map((card) => {
          return (
            <Card key={card.id} card={card} choiceHandler={choiceHandler} />
          );
        })}
      </Col>
      <Col md={3}>
        <h3>Player2</h3>
        <p>{playerTwoScore}</p>
        {player.playing === "playerTwo" && <p>It's your turn</p>}
      </Col>
    </Row>
  );
};

export default Game;
