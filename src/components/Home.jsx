import React from "react";

export default function Home( { setQuizState } ) {

    return (
        <main className="home">
            <h1 className="home--title">Quizeo</h1>
            <p className="home--description">Test your knowledge..</p>
            <button className="home--button" onClick={() => setQuizState("quiz")}>Start Quiz</button>
        </main>
    )
}