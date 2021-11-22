import { createSlice } from "@reduxjs/toolkit";
import { cards } from "./cards";
const initialCardsState = {
  cards,
};

// Now for dispatching actions createSlice has got us covered.
// It automatically creates unique action identifiers for our different reducers.
// To get hold of these action identifiers, we can use our counterSlice and access `.actions`.

const cardsSlice = createSlice({
  name: "Cards",
  initialState: initialCardsState,
  reducers: {
    shuffle(state) {
      state.cards = state.cards.sort(() => Math.random() - 0.5);
    },
    setFirstChoice(state, action) {
      state.firstChoice = action.payload;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

// Actions are used for dispatching actions to our reducer
export const cardsActions = cardsSlice.actions;

export default cardsSlice.reducer;
