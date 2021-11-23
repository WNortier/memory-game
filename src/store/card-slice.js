import { createSlice } from "@reduxjs/toolkit";
import { cards } from "./cards";
const initialCardsState = {
  cards,
  thing: { test: "hello" },
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
    update(state, action) {
      state.cards = action.payload;
      // state.cards.map((card) => {
      //   console.log(card);
      // });
      // state.cards = state.cards.map((card) => console.log(card));
      //console.log(state.thing);
      //console.log(action.payload);
      //state.cards = state.cards.filter((card) => card.id !== action.payload.id);
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

// Actions are used for dispatching actions to our reducer
export const cardsActions = cardsSlice.actions;

export default cardsSlice.reducer;
