import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
      name: 'matches',
      initialState: {
            matches: []
      },
      reducers: {
            addMatch: (state, action) => {
                  if (state.matches.find(match => match.id === action.payload.id)) {
                        console.error('Match already exists!');
                        return;
                  }
                  state.matches.push(action.payload);
            },
            removeMatch: (state, action) => {
                  if (state.matches.length === 0) {
                        console.error('No matches to delete.');
                        return;
                  }
                  state.matches.splice(action.payload, 1);
            },
            deleteAllMatches: (state, action) => {
                  if (state.matches.length === 0) {
                        console.error('No matches to delete.');
                        return;
                  }
                  state.matches = [];
            }
      }
});

export const { addMatch, removeMatch, deleteAllMatches } = slice.actions;

export const selectMatches = state => state.matches.matches;

export default slice.reducer;
