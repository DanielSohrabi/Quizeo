import React from "react"
import Question from "./Question.jsx"
import { nanoid } from "nanoid"
import { decode } from "html-entities"

export default function Quiz( { quizState, setQuizState } ) {
    const [rawQuestionsData, setRawQuestionsData] = React.useState([])
    const [questionFormData, setQuestionFormData] = React.useState([])
    
    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=28&type=multiple")
            .then((response) => response.json())
            .then((jsonResponse) => {
                const apiResults = jsonResponse.results

                setRawQuestionsData(apiResults)
                
                setQuestionFormData(
                    apiResults.map((rawQuestionData, index) => (
                        {
                            questionNumber: index,
                            correctAnswer: rawQuestionData.correct_answer,
                            chosenAnswer: "",
                            isCorrect: ""
                        }
                    ))
                )        
            })
    }, [])

    function handleAnswerCheck() {
        const newQuestionFormData = questionFormData.map((currentQuestion) => ({
            ...currentQuestion,
            isCorrect: currentQuestion.correctAnswer === currentQuestion.chosenAnswer
        }))

        setQuestionFormData(newQuestionFormData)
        setQuizState("quiz--complete")
    }

    function restartQuiz() {
        setQuizState("home")
    }

    const renderedQuestions = rawQuestionsData.map((rawQuestionData, index) => {
        const key = nanoid()

        return (
            <Question
                rawQuestionData={rawQuestionData}
                questionIndex={index}
                questionFormData={questionFormData}
                setQuestionFormData={setQuestionFormData}
                quizState={quizState}
            />
        )
    })

    if (rawQuestionsData.length > 0) {
        return (

            <div className="quiz">
                {renderedQuestions}

                {
                    quizState === "quiz--complete" ?

                    <button
                        className="quiz--submit-button"
                        onClick={restartQuiz}
                    >
                        Restart Quiz
                    </button>

                    :
                    
                    <button
                        className="quiz--submit-button"
                        onClick={handleAnswerCheck}
                    >
                        Check Answers
                    </button>


                }

            </div>
            
        )
    }
}
