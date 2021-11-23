import { createSlice } from "@reduxjs/toolkit";
import { cards } from "./cards";
const initialCardsState = {
  cards,
  thing: { test: "hello" },
};

const cardsSlice = createSlice({
  name: "Cards",
  initialState: initialCardsState,
  reducers: {
    shuffle(state) {
      state.cards = state.cards.sort(() => Math.random() - 0.5);
    },
    update(state, action) {
      state.cards = action.payload;
    },
    resetCards(state) {
      console.log("in here");
      state.cards = cards;
    },
  },
});

export const cardsActions = cardsSlice.actions;

export default cardsSlice.reducer;
