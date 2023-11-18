import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDeck } from "@/api/deckAPI";

const initialState = {
  cards: null,
  isLoading: true,
  error: null,
};

export const fetchDeck = createAsyncThunk(
  "deck/get",
  async ({ interestingGender }) => {
    const data = await getDeck(interestingGender);
    return data;
  }
);

const deckSlice = createSlice({
  name: "deckSlice",
  initialState,
  reducers: {
    removeCard : (state,action) => {
      console.log('here');
      state.cards = [...state.cards].filter(card => card.id != action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDeck.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDeck.fulfilled, (state, action) => {
      state.cards = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchDeck.rejected, (state, action) => {
      state.isLoading = false;
      throw new Error(`{
        error:${action.error.code}
        message:${action.error.message}
      }`);
    });
  },
});

export default deckSlice;

export const { removeCard } = deckSlice.actions;

export const getCards = (state) => state.deckSlice.cards;
export const getError = (state) => state.deckSlice.error;
export const getIsLoading = (state) => state.deckSlice.isLoading;
