import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { url, setHeaders } from "./api";

const initialState = {
  token: localStorage.getItem("token"),
  matches: [],
  seen: [],
  initLogin: true,
  username: "",
  _id: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

export const swipeLeft = createAsyncThunk(
  "auth/swipeLeft",
  async (values, {rejectWithValue}) => {
    try {
      const nextMovie = await axios.post(`api/swipe_left`, {
        username: values.username,
        movie_id: values.movie_id
      });
      return nextMovie.data;
    }
    catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const swipeRight = createAsyncThunk(
  "auth/swipeRight",
  async (values, {rejectWithValue}) => {
    try {
      const nextMovie = await axios.post(`api/swipe_right`, {
        username: values.username,
        movie_id: values.movie_id
      });
      return nextMovie.data;
    }
    catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addSeen = createAsyncThunk(
  "auth/addSeenMovie",
  async (values, {rejectWithValue}) => {
    try {
      const nextMovie = await axios.post(`api/add_seen_movie`, {
        username: values.username,
        movie_id: values.id
      });
      return nextMovie;
    }
    catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const initLogin = createAsyncThunk(
  "auth/initLogin",
  async (values, {rejectWithValue}) => {
    try {
      const initLogin = await axios.post(`api/init_login`, {
        username: values.username,
      });
      console.log(initLogin);
      return initLogin.data.initLogin;
    }
    catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (values, { rejectWithValue }) => {
    try {
      const token = await axios.post(`api/register`, {
        username: values.username,
        password: values.password,
      });

      localStorage.setItem("token", token.data);
      return token.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (values, { rejectWithValue }) => {
    try {
      const token = await axios.post(`api/login`, {
        username: values.username,
        password: values.password,
      });
      localStorage.setItem("token", token.data);
      return token.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserMatches = createAsyncThunk(
  "auth/getUserMatches",
  async (values, { rejectWithValue }) => {
    try {
      const matches = await axios.post(`api/matches`, {
        username: values
      });
      console.log(matches);
      return matches.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const saveMatch = createAsyncThunk(
  "auth/saveMatch",
  async (values, { rejectWithValue }) => {
    try {
      console.log(values);
      const match = await axios.post(`api/save_match`, {
        username: values.username,
        match: values.match,
      });
      return match;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAllMatches = createAsyncThunk(
  "auth/deleteAllMatches",
  async (values, { rejectWithValue }) => {
    try {
      const match = await axios.post(`api/delete_matches`, {
        username: values.username
      });
      return match;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteSingleMatch = createAsyncThunk(
  "auth/deleteSingleMatch",
  async (values, { rejectWithValue }) => {
    try {
      const request = await axios.post(`api/delete_one`, {
        username: values.username,
        toDelete: values.toDelete,
      });
      return request;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (id, { rejectWithValue }) => {
    try {
      const token = await axios.get(`${url}/user/${id}`, setHeaders());
      localStorage.setItem("token", token.data);
      return token.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    setNewSeenMovie: (state, action) => {
      let newSeen = action.payload;
      const oldSeen = state.seen;
      let newSeenArray = [...oldSeen, newSeen];
      state.seen = newSeenArray;
    },

    deleteAllSeenMovies: (state, action) => {
      state.seen =  [];
    },

    removeMatch (state, action) {
      const matches = state.matches.filter((match) => match.id !== action.payload);
      state.matches = matches;
      
    },

    addMatch (state, action) {
      if (state.matches.find(match => match.id === action.payload.id)) {
        console.error('Match already exists!');
        return;
      }
      state.matches.push(action.payload);
    },

    removeAllMatches (state, action) {
      if (state.matches.length === 0) {
        console.error('No matches to delete.');
        return;
      } else {
        state.matches = [];
      }
    },
    loadUser(state, action) {
      const token = state.token;

      if (token) {
        const user = jwtDecode(token);
        return {
          ...state,
          token,
          matches: user.matches,
          seen: user.seen,
          username: user.username,
          _id: user._id,
          userLoaded: true,
          initLogin: true,
        };
      } else return { ...state, userLoaded: true };
    },
    logoutUser(state, action) {
      localStorage.removeItem("token");

      return {
        ...state,
        token: "",
        matches: [],
        seen: [],
        username: "",
        _id: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
      };
    },
  },
  extraReducers: (builder) => {

    builder.addCase(addSeen.fulfilled, (state, action) => {
      return {...state, seen: action.payload}
    });

    builder.addCase(addSeen.rejected, (state, action) => {
      return { ...state, seen: "error" };
    });

    builder.addCase(addSeen.pending, (state, action) => {
      return { ...state};
    });

    builder.addCase(initLogin.fulfilled, (state, action) => {
      return {...state, initLogin: action.payload};
    });

    builder.addCase(getUserMatches.pending , (state, action) => {
      return { ...state, userLoaded: "pending" };
    });
    builder.addCase(getUserMatches.fulfilled , (state, action) => {
      return { ...state, userLoaded: "fulfilled", matches: action.payload }
    } );

    builder.addCase(getUserMatches.rejected , (state, action) => {

      return { ...state, userLoaded: "rejected get matches", matches: [] }
    } );

    builder.addCase(saveMatch.pending , (state, action) => {
      return { ...state, userLoaded: "pending save match" };
    } );
    builder.addCase(saveMatch.fulfilled , (state, action) => {
        return { ...state, userLoaded: "fulfilled save match" }
    } );

    builder.addCase(saveMatch.rejected , (state, action) => {

      return { ...state, userLoaded: "rejected save", matches: [] }
    } );

    builder.addCase(deleteAllMatches.pending , (state, action) => {
      return { ...state, matches: state.matches };
    } );

    builder.addCase(deleteAllMatches.fulfilled , (state, action) => {
      return { ...state, matches: []};
    } );

    builder.addCase(deleteAllMatches.rejected , (state, action) => {
      return { ...state , matches: state.matches };  
    } );

    
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          seen: [],
          matches: user.matches,
          username: user.username,
          _id: user._id,
          registerStatus: "success",
          initLogin: true,
        };
      } else return state;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });
    builder.addCase(loginUser.pending, (state, action) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        console.log(user);
        return {
          ...state,
          token: action.payload,
          seen: user.seen,
          matches: user.matches,
          username: user.username,
          _id: user._id,
          loginStatus: "success",
          loginError: "",
        };
      } else return state;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });
    builder.addCase(getUser.pending, (state, action) => {
      return {
        ...state,
        getUserStatus: "pending",
      };
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          matches: user.matches,
          seen: user.seen,
          username: user.username,
          _id: user._id,
          getUserStatus: "success",
        };
      } else return state;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      return {
        ...state,
        getUserStatus: "rejected",
        getUserError: action.payload,
      };
    });
  },
});

export const { loadUser, logoutUser, addMatch, removeAllMatches, saveMatchesInDatabase , removeMatch, setNewSeenMovie, deleteAllSeenMovies} = authSlice.actions;

export const selectMatches = state => state.auth.matches;

export const selectSeen = state => state.auth.seen;

export const selectInitLogin = state => state.auth.initLogin;

export default authSlice.reducer;
