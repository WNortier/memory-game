import React from "react";
import classes from "./Card.module.css";
import { useSelector, useDispatch } from "react-redux";
import { cardsActions } from "../store/card-slice";

const Card = (props) => {
  // const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.cards);
  // const firstChoice = useSelector((state) => state.cards.firstChoice);

  const style = {
    color: props.card.color,
    fontWeight: "bold",
  };

  const choiceHandler = (id) => {
    // dispatch(cardsActions.setFirstChoice(id));
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
