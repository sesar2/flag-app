import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage'
import CountryPage from './pages/CountryPage/CountryPage'
import Countries from './pages/Countries/Countries'
import CollectionPage from './pages/CollectionPage/CollectionPage'
import BackButton from './components/BackButton'
import SelectDifficultyPage from './pages/SelectDifficultyPage/SelectDifficultyPage'
import { useSelector } from 'react-redux'
import QuizPage from './pages/QuizPage/QuizPage'
import LeaderBoardPage from './pages/LeaderboardPage/LeaderBoardPage'

function App() {
  const quizStarted = useSelector((state) => state.quiz.quizStarted);

  return (
    <div className="site-wrapper"> 
    <BackButton defaultUrl='/'/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/countries' element={<Countries/>}/>
        <Route path='/country/:name' element={<CountryPage/>}/>
        <Route path='/collection' element={<CollectionPage/>}/>
        <Route path='/quiz' element={!quizStarted ? <SelectDifficultyPage/> : <QuizPage/>}/>
        <Route path='/leaderboard' element={<LeaderBoardPage/>}/>
        <Route path='*' element={<h1>404 Not Found</h1>}/>
      </Routes>
    </div>
  )
}

export default App
