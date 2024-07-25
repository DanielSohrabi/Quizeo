import React from "react"

import Home from "./components/Home.jsx"
import Quiz from "./components/Quiz.jsx"

import './App.css'

function App() {
  const [quizState, setQuizState] = React.useState("home")
  
  return (
    <>
      {quizState === "home" ? <Home setQuizState={setQuizState}/> : <Quiz quizState={quizState} setQuizState={setQuizState}/>}
    </>
  )
}

export default App
