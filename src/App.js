import { useState, useEffect, useRef } from "react";

import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import Notification from "./components/Notification";
import Popup from "./components/Popup";

function App() {
  const words = ['application', 'programming', 'interface', 'wizard', 'notification', 'javascript', 'physiology', 'compartmentalize', 'computer', 'relationship']
  let word = words[Math.floor(Math.random() * words.length)]
  const selectedWord = useRef(word)

  const [playable, setPlayable] = useState(true)
  const [correctLetters, setCorrectLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [showNotification, setShowNotification] = useState(false)

  const notification = () => {
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 2000)
  }

  useEffect(() => {
    const handleKeydown = (event) => {
      const {key, keyCode} = event
      if(playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase()

        if(selectedWord.current.includes(letter)) {
          if(!correctLetters.includes(letter)) {
            setCorrectLetters(correctLetters => [...correctLetters, letter])
          } else {
              notification()
          }
        } else {
          if(!wrongLetters.includes(letter)) {
            setWrongLetters(wrongLetters => [...wrongLetters, letter])
          } else {
             notification()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeydown)

    return () => window.removeEventListener('keydown', handleKeydown)
  }, [correctLetters, wrongLetters, playable, selectedWord])

  const playAgain = () => {
    setPlayable(true)
    setCorrectLetters([])
    setWrongLetters([])

    let random = Math.floor(Math.random() * words.length)
    selectedWord.current = words[random]

  
  }


  return (
   <>
     <Header />
     <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord.current} correctLetters={correctLetters} />
        <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord.current} setPlayable={setPlayable} playAgain={playAgain} />
        <Notification showNotification={showNotification} />
     </div>
   </>
  )
}

export default App;
