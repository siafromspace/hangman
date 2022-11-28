import { useEffect, useState } from "react";
import FlashcardList from "./components/FlashcardList";
import axios from "axios";

function App() {
  const [flashcards, setFlashcards] = useState([])
  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=10')
         .then(res => {
          setFlashcards(res.data.results.map((questionItem, index) => {
            const answer = questionItem.answer
            const options = [...questionItem.incorrect_answers, answer]
            return {
              id: `${index}-${Date.now()}`,
              question: decodeString(questionItem.question),
              answer: questionItem.correct_answer,
              options: options.sort(() => Math.random() - 0.5)
            }
          }))
         })
  }, [])
  return (
    <div>
      <FlashcardList flashcards={flashcards} />
    </div>
  )
}

const decodeString = (str) => {
  const textArea = document.createElement('textarea')
  textArea.innerHTML = str
  return textArea.value
}

export default App;
