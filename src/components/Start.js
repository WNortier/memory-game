import React, { Fragment } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classes from "./Start.module.css";
import { useNavigate } from "react-router-dom";
import { playersActions } from "../store/players-slice";
import { useSelector, useDispatch } from "react-redux";

const Start = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerOneNameHandler = (e) => {
    props.onSetPlayerOneName(e.target.value);
  };

  const playerTwoNameHandler = (e) => {
    props.onSetPlayerTwoName(e.target.value);
  };

  const newGameHandler = () => {
    navigate("/game", { replace: true });
    dispatch(playersActions.setIsPlaying());
  };

  return (
    <Fragment>
      <div className={classes.heading}>
        <h1>Are you ready to play?</h1>
      </div>
      <Row>
        <Col md={6}>
          <input
            type="text"
            onChange={playerOneNameHandler}
            placeholder="Name of Player 1"
          ></input>
        </Col>
        <Col md={6}>
          <input
            type="text"
            onChange={playerTwoNameHandler}
            placeholder="Name of Player 2"
          ></input>
        </Col>
        <div>
          {" "}
          <button className={classes.startBtn} onClick={newGameHandler}>
            New Game
          </button>{" "}
        </div>
      </Row>
    </Fragment>
  );
};

export default Start;
