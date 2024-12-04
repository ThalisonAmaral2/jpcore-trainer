import "./GuessWordEnd.css"

const GuessWordEnd = ({
    score,
    retry,
    missedWords
}) => {
    return (
        <div className="container">
        <div>
            <h1>Game over</h1>
            <p>You got {score} words right</p>

            <button onClick={retry}>Retry</button>
        </div>

        <div>
            <h2>You need to review the following words:</h2>
            {missedWords.map((el, index) => {
                return (
                    <div className="missed-word" key="index">
                        <h3> <span title={el.kana}>{el.word}</span></h3>
                        <p><b>Translation: </b> {el.translation.toString()}</p>
                    </div>
                )
            })}
        </div>
        </div>
    )
}

export default GuessWordEnd