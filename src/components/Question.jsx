import React from "react"
import { nanoid } from "nanoid"
import { decode } from "html-entities"

export default function Question( { rawQuestionData, questionIndex, questionFormData, setQuestionFormData, quizState } ) {
    const {question, incorrect_answers, correct_answer} = rawQuestionData

    function handleChange(event) {
        const newQuestionFormData = questionFormData.map((currentQuestion, index) => {
            if (index == questionIndex && quizState !== "quiz--complete") {
                return {
                    questionNumber: currentQuestion.questionNumber,
                    correctAnswer: currentQuestion.correctAnswer,
                    chosenAnswer: event.target.value,
                    isCorrect: currentQuestion.isCorrect
                }
            }
            else {return currentQuestion}
        })

        setQuestionFormData(newQuestionFormData)
    }

    
    // Use fisher yates to shuffer correct and incorrect answers
    const [shuffledAnswersArray, setShuffledAnswersArray] = React.useState([...incorrect_answers, correct_answer])
    
    React.useEffect(() => {
        let tempArray = [...shuffledAnswersArray]

        for (let i = tempArray.length - 1; i > 0 ; i--) {
            const randomIndex = Math.floor(Math.random() * (i+1))
    
            const temp = tempArray[i]
            tempArray[i] = tempArray[randomIndex]
            tempArray[randomIndex] = temp
        }

        setShuffledAnswersArray(tempArray)
    }, [])

    const answerButtons = shuffledAnswersArray.map((currentAnswer, index) => {
        let labelStyleClass = {}

        // various classes used for styling
        if (questionFormData[questionIndex].isCorrect === true && currentAnswer === questionFormData[questionIndex].chosenAnswer) {
            labelStyleClass = "question--label question--label-correct"
        } else if (questionFormData[questionIndex].isCorrect === false && currentAnswer === questionFormData[questionIndex].chosenAnswer) {
            console.log(currentAnswer)
            labelStyleClass = "question--label question--label-incorrect"
        } else if (questionFormData[questionIndex].isCorrect === false && currentAnswer === questionFormData[questionIndex].correctAnswer) {
            labelStyleClass = "question--label question--label-correct-guide"
        } else if (currentAnswer === questionFormData[questionIndex].chosenAnswer) {
            labelStyleClass = "question--label question--label-checked"
        } else {
            labelStyleClass = "question--label"
        }
        
        const key = nanoid()
        
        return (
            <>
                <input
                    type="radio"
                    className="question--radio"
                    name={currentAnswer}
                    id={currentAnswer}
                    value={currentAnswer}

                    checked={currentAnswer === questionFormData[questionIndex].chosenAnswer}
                    onChange={handleChange}
                />

                <label 
                    htmlFor={currentAnswer}
                    className={labelStyleClass}
                >
                    {decode(currentAnswer)}
                </label>
            </>
        )
    })

    return (
        <>
            <h1 className="question--header">{(questionIndex+1)+". "+decode(question)}</h1>
            <div>
                {answerButtons}
            </div>
            
            <hr></hr>
        </>
    )
}