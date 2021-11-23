import { createSlice } from "@reduxjs/toolkit";

const initialCardsState = {
  playerOneScore: 0,
  playerTwoScore: 0,
  player: "playerOne",
  isPlaying: false,
};

const playersSlice = createSlice({
  name: "Players",
  initialState: initialCardsState,
  reducers: {
    addScorePlayerOne(state) {
      state.playerOneScore = ++state.playerOneScore;
    },
    addScorePlayerTwo(state) {
      state.playerTwoScore = ++state.playerTwoScore;
    },
    setPlayerOnePlaying(state) {
      state.player = "playerOne";
    },
    setPlayerTwoPlaying(state) {
      state.player = "playerTwo";
    },
    resetScores(state) {
      state.player = "playerOne";
      state.playerOneScore = 0;
      state.playerTwoScore = 0;
    },
    setIsPlaying(state) {
      state.isPlaying = !state.isPlaying;
    },
  },
});

export const playersActions = playersSlice.actions;

export default playersSlice.reducer;
