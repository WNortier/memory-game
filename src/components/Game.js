import { React, useState } from "react";

import classes from "./Game.module.css";
import { useEffect } from "react";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { cardsActions } from "../store/card-slice";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Game = () => {
  const cards = useSelector((state) => state.cards.cards);
  const playerOneTurn = useSelector((state) => state.cards.playerOne);
  const playerTwoTurn = useSelector((state) => state.cards.playerTwo);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const choiceHandler = (card) => {
    console.log(card);
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  return (
    <Row>
      <Col md={3}>
        <h5>Player1</h5>
        {playerOneTurn && <p>It's your turn</p>}
      </Col>
      <Col md={6}>
        {cards.map((card) => {
          return <Card card={card} choiceHandler={choiceHandler} />;
        })}
      </Col>
      <Col md={3}>
        <h5>Player2</h5>
        {playerTwoTurn && <p>It's your turn</p>}
      </Col>
    </Row>
  );
};

export default Game;
