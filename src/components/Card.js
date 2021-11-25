import React from "react";
import classes from "./Card.module.css";
import { useSelector } from "react-redux";

const Card = (props) => {
  const cards = useSelector((state) => state.cards.cards);

  const choiceHandler = (id) => {
    const selected = cards.find((card) => card.id === id);
    props.choiceHandler(selected);
  };

  return (
    <div
      onClick={() => {
        choiceHandler(props.card.id);
      }}
      style={{ visibility: props.card.matched ? "hidden" : "visible" }}
      className={classes.card}
    >
      <div className={props.flipped ? classes.flipped : ""}>
        <img className={classes.front} src={props.card.src} alt="card front" />

        <img className={classes.back} src="/img/cards/Card_Back.svg" />
      </div>
    </div>
  );
};

export default Card;
