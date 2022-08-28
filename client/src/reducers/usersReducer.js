import { createSlice,  createAsyncThunk } from "@reduxjs/toolkit";


const userToken = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null


export const slice = createSlice({
      name: 'user',
      initialState: {
            loading: false,
            matches: [],
            username: "",
            password: "",
            userToken,
            error: null,
            success: false,
      },
      reducers: {
            addUser : (state, action) => {
                  state.username = action.payload.username
                  state.password = action.payload.password
            },
            setUserToken : (state, action) => {
                  state.userToken = action.payload;
            },
            setLoading : (state, action) => {
                  state.loading = action.payload;
            },
            setError : (state, action) => {
                  state.error = action.payload;
            },
            setSuccess : (state, action) => {
                  state.success = action.payload;
            },
            addMatch: (state, action) => {
                  // if (state.matches.find(match => match.id === action.payload.id)) {
                  //       console.error('Match already exists!');
                  //       return;
                  // }
                  state.user.matches.push(action.payload);
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
      },
});

export const { addUser, setUserToken, setLoading, setError, setSuccess, addMatch, removeMatch, deleteAllMatches } = slice.actions;

export const selectMatches = state => state.user.matches;
export const selectToken = state => state.user.userToken;

export default slice.reducer;


