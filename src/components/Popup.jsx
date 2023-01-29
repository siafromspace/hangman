import { useEffect } from "react"

const Popup = ({correctLetters, wrongLetters, selectedWord, setPlayable, playAgain}) => {
  let finalMessage = ""
  let finalMessageRevealWord = ""
  let playable = true

  const checkWin = (correct, wrong, word) => {
    let status = 'win'

    word.split("").forEach(letter => {
      if(!correct.includes(letter)) {
        status = ""
      }
    })

    if(wrong.length === 6) status = "lose"
    return status
  }

  if (checkWin(correctLetters, wrongLetters, selectedWord) === 'win') {
    finalMessage = "Congratulations, you won!"
    playable = false
  } else if (checkWin(correctLetters, wrongLetters, selectedWord) === 'lose') {
    finalMessage = "Unfortunately, you lost"
    finalMessageRevealWord = `... the word was ${selectedWord}`
    playable = false
  }

  useEffect(() => setPlayable(playable))

  return ( 
    <div className="popup-container" style={finalMessage !== '' ? {display: 'flex'} : {}}>
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
     );
}
 
export default Popup;