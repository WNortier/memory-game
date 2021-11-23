import React from "react";
import classes from "./Card.module.css";
import { useSelector } from "react-redux";

const Card = (props) => {
  const cards = useSelector((state) => state.cards.cards);

  const style = {
    color: props.card.color,
    fontWeight: "bold",
  };

  const choiceHandler = (id) => {
    const selected = cards.find((card) => card.id === id);
    props.choiceHandler(selected);
  };

  return (
    <div
      onClick={() => {
        choiceHandler(props.card.id);
      }}
      className={classes.cards}
      style={{ visibility: props.card.matched ? "hidden" : "visible" }}
    >
      {console.log(props.flipped)}
      <div className={props.flipped ? classes.flipped : ""}>
        <div className={classes.front}>
          <p style={style}>{props.card.value}</p>
          <p style={style} className={classes.suit}>
            {props.card.suit}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
