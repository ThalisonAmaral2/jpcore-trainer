import './GuessWord.css'
import ProgressBar from './ProgressBar'



const GuessWord = ({
    word,
    threeOptions,
    verifyAnswer,
    guessesLeft,
    wordsLeft,
    jpcore
}) => {

    return (
    <>
    <ProgressBar 
        wordsLeft={wordsLeft}
        jpcore={jpcore}
    />
    <h3>Mistakes: {guessesLeft}</h3>
    <div className="quiz-container">
        <h2 className="kanji" title={word.kana}>{word.word}</h2>
        <div className="options">
            {threeOptions.map((el, ind) => {
                const cleanString = el.replace(/\(.*?\)/g, '').trim()
                return (
                    <button onClick={verifyAnswer} key={ind} className="option-button">{cleanString}</button>
                )
            })}
        </div>
    </div>
    </>
    )
}

export default GuessWord