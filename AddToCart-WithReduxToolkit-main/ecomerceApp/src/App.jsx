import React from 'react'
import Header from './components/Header'
import Home from './components/Home'
import CardDetails from './components/CardDetails'
import {Routes,Route} from "react-router-dom"
import  { Toaster } from 'react-hot-toast';
import Success from "./components/success"
import Cancel from "./components/cancel"
function App() {
  
  return (
    <div>
      <Header/>
        <Routes>
          <Route path='/' element={ <Home/>}/>
          <Route path='/card' element={ <CardDetails/>}/>
          <Route path='/success' element={ <Success/>}/>
          <Route path='/cancel' element={ <Cancel/>}/>
          </Routes>      
          <Toaster />
    </div>
  )
}

export default App