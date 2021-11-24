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
  const [showMatch, setShowMatch] = useState(false);
  const [showCards, setShowCards] = useState(true);

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
          setShowCards(false);
          setShowMatch(true);
          setTimeout(() => {
            setShowMatch(false);
            setShowCards(true);
          }, 1500);
        }, 1250);
        if (player === "playerOne") {
          dispatch(playersActions.addScorePlayerOne());
          dispatch(playersActions.setPlayerTwoPlaying());
        } else {
          dispatch(playersActions.addScorePlayerTwo());
          dispatch(playersActions.setPlayerOnePlaying());
        }
        setTimeout(() => {
          resetRound();
        }, 1250);
      } else {
        if (player === "playerOne") {
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
        <div className={classes.playerOneColumn}>
          <div className={classes.playerOne}>
            <img src="/img/Player_1.svg" alt="Player 1" />
            <h3>{playerOneName}</h3>
            <p>{playerOneScore}</p>
          </div>
          {player === "playerOne" && (
            <div className={classes.playerOneTurn}>
              <p>It's Your Turn</p>
            </div>
          )}
        </div>
      </Col>
      <Col md={6}>
        <div className={classes.deckContainer}>
          {showMatch && <img src="/img/Match.svg" alt="Player 2" />}
          {showCards && (
            <div className={classes.deck}>
              {cards.map((card) => {
                return (
                  <Card
                    key={card.id}
                    card={card}
                    choiceHandler={choiceHandler}
                    flipped={
                      card === choiceOne || card === choiceTwo || card.matched
                    }
                  />
                );
              })}
            </div>
          )}
        </div>
      </Col>
      <Col md={3}>
        <div className={classes.playerTwoColumn}>
          <div className={classes.playerTwo}>
            <img src="/img/Player_2.svg" alt="Player 2" />
            <h3>{playerTwoName}</h3>
            <p>{playerTwoScore}</p>
          </div>
          <div className={classes.playerTwoTurn}>
            {player === "playerTwo" && <p>It's your turn</p>}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Game;
