import { createSlice } from "@reduxjs/toolkit";

const initialCardsState = {
  playerOneName: "",
  playerTwoName: "",
  playerOneScore: 26,
  playerTwoScore: 0,
  player: "playerOne",
  isPlaying: false,
  showHeading: true,
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
    setPlayerOneName(state, action) {
      state.playerOneName = action.payload;
    },
    setPlayerTwoName(state, action) {
      state.playerTwoName = action.payload;
    },
    resetScores(state) {
      state.player = "playerOne";
      state.playerOneScore = 0;
      state.playerTwoScore = 0;
    },
    setIsPlaying(state, action) {
      state.isPlaying = action.payload;
    },
    showHeading(state, action) {
      state.notScores = action.payload;
    },
  },
});

export const playersActions = playersSlice.actions;

export default playersSlice.reducer;
