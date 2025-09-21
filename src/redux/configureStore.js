import { configureStore } from "@reduxjs/toolkit"
import countriesSlice from "./countriesSlice";
import quizSlice from "./quizSlice";
const store = configureStore({
    reducer: {
        countries: countriesSlice,
        quiz: quizSlice,
    }
})

export default store;
