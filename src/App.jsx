import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage'
import Countries from './pages/Countries/Countries'

function App() {

  return (
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/countries' element={<Countries/>}/>

      </Routes>
  )
}

export default App
