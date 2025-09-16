import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage'
import CountryPage from './pages/CountryPage/CountryPage'
import Countries from './pages/Countries/Countries'

function App() {

  return (
    <div className="site-wrapper"> 
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/countries' element={<Countries/>}/>
        <Route path='/country/:name' element={<CountryPage/>}/>
      </Routes>
    </div>
  )
}

export default App
