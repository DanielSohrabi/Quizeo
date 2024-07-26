import React from "react";

export default function Home( { setQuizState, setUserPoints, userPoints } ) {
    if (localStorage.getItem("userPoints")) {
        setUserPoints(localStorage.getItem("userPoints"))
    } else {localStorage.setItem("userPoints", 0)}

    return (
        <main className="home">
            <h1 className="home--title">Quizeo</h1>
            <p className="home--description">Test your knowledge..</p>
            <button className="home--button" onClick={() => setQuizState("quiz")}>Start Quiz</button>
            
            <h3 className="home--user-points">Points: {userPoints}</h3>
        </main>
    )
}