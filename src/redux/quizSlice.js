import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



const quizSlice = createSlice({
  name: "quizSlice",
  initialState: {
    quizDifficulty: 'Easy', 
    quizStarted: false,
    username: '',
    score: 0,
    questionIndex: 0,
    quizCountries: [],
    easyLeaderBoard: localStorage.getItem("easyLeaderboard") ? JSON.parse(localStorage.getItem("easyLeaderboard")) : [],
    mediumLeaderBoard: localStorage.getItem("mediumLeaderboard") ? JSON.parse(localStorage.getItem("mediumLeaderboard")) : [],
    hardLeaderBoard: localStorage.getItem("hardLeaderboard") ? JSON.parse(localStorage.getItem("hardLeaderboard")) : [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setDifficulty: (state, action) => {
      state.quizDifficulty = action.payload;
    },
    incrementScore: (state) => {
      state.score += 1;
    },
    nextQuestion: (state) => {
      state.questionIndex += 1;  
  },
    resetQuiz: (state) => {
      state.score = 0;
      state.questionIndex = 0;
      state.quizCountries = [];
      state.status = 'idle';
      state.error = null;
    },
    setCountries: (state, action) => {
      state.quizCountries = action.payload;
    }
},
});

export const { setDifficulty, incrementScore, nextQuestion, resetQuiz, setCountries } = quizSlice.actions;
export default quizSlice.reducer;
