import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



const quizSlice = createSlice({
  name: "quizSlice",
  initialState: {
    quizDifficulty: 'Easy', 
    quizStarted: false,
    username: '',
    score: 0,
    questionIndex: 1,
    quizRegion: 'All',
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
      state.quizStarted = false;
      state.error = null;
    },
    setCountries: (state, action) => {
      state.quizCountries = [...action.payload];
    },
    startQuiz: (state) => {
      state.quizStarted = true;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setQuizRegion: (state, action) => {
        state.quizRegion = action.payload
    },
    saveScore: (state, action) => {
      const result = {username: state.username, region: state.quizRegion, score: state.score}

      let key, leaderboard;
      if (state.quizDifficulty === "Easy") {
        key = "easyLeaderboard";
        leaderboard = state.easyLeaderBoard;
      } else if (state.quizDifficulty === "Medium") {
        key = "mediumLeaderboard";
        leaderboard = state.mediumLeaderBoard;
      } else {
        key = "hardLeaderboard";
        leaderboard = state.hardLeaderBoard;
      }

      leaderboard.push(result);

      leaderboard.sort((a, b) => b.score - a.score);

      localStorage.setItem(key, JSON.stringify(leaderboard));
    },
},
});

export const { setDifficulty, incrementScore, nextQuestion, resetQuiz, setCountries, startQuiz, setUsername, setQuizRegion, saveScore } = quizSlice.actions;
export default quizSlice.reducer;
