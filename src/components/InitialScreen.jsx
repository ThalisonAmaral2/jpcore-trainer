
// import './InitialScreen.css'

const InitialScreen = ({changeMenuState}) => {

    const startGuessWord = () => {
        changeMenuState("guess-word");
    }
    return (
    <div className="initial-screen">
        <h2 className="title">Initial Screen</h2>
        <button className="start-button" onClick={startGuessWord}>Guess Words</button>
    </div>
    )

}

export default InitialScreen