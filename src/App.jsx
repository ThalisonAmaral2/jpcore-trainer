import { useState, useEffect, useRef} from 'react'

import './App.css'


//Components
import GuessWord from './components/GuessWord';
import InitialScreen from './components/InitialScreen';
import GuessWordEnd from './components/GuessWordEnd';


function App() {
  //Data from API
  const [jpcore, setJpcore] = useState([])

  //Menu States
  const MENU_STATES ={
    START: "start",
    GUESS_WORD: "guess-word",
    GUESS_WORD_END: "guess-word-end"
  }
  const [menuState, setMenuState] = useState(MENU_STATES.START);


  // Data States for GuessWord
  const [wordsLeft, setWordsLeft] = useState([])
  const [correctWords, setCorrectWords] = useState([])
  const [missedWords, setMissedWords] = useState([])
  const [threeOptions, setThreeOptions] = useState([])
  // --- Picked Word Data
  const [word, setWord] = useState({})

  // Score tracking and game logic
  const [score, setScore] = useState(0);
  const [guessesLeft, setGuessesLeft] = useState(3)

  //Fetch API
  useEffect(() => {
    async function fetchJpcore(){
      const res = await fetch("http://192.168.0.14:3000/api/jpcore1000?page=1");
      const data = await res.json();
      setJpcore(data);
      // setWordsLeft(data)
    }

    fetchJpcore()
  },[])

  const loadGame = (length) => {
    const wordsToAdd = jpcore.slice(0, length); // Get a slice of the jpcore array
    setWordsLeft((prevWords) => [...prevWords, ...wordsToAdd]); // Use functional state update
  }

  // Pick random word from wordsLeft      
  const pickNextWord = () => {
    //This function should run only after wordsLeft is updated
    const rand = Math.floor(Math.random() * wordsLeft.length)

    const pickedWord = wordsLeft[rand]
    setWord(pickedWord)


    console.log("pickedWord: ", pickedWord)

    function getRandomOptions(){
      const options = new Set();
      
      while(options.size < 3){
        const rand = Math.floor(Math.random() * jpcore.length);
        const foundWordObject = jpcore[rand].translation[0];
        options.add(foundWordObject)
      }

      let arrayOptions = [...options]

      const randCorrectIndex = Math.floor(Math.random() * 3);

      arrayOptions[randCorrectIndex] = pickedWord.translation[0];

      console.log('randCorrect Index: ',randCorrectIndex);

      setThreeOptions(arrayOptions)
    }

    getRandomOptions()

    console.log(`correto`, pickedWord.translation)
    //A re-render of the GuessWord must be triggered after this function
  }

  //Validate user Answer and manage words lists state
  const verifyAnswer = (e) => {
    const userAnswer = e.target.innerText.trim();
    const correctAnswer = word.translation[0].replace(/\(.*?\)/g, '').trim();
  
    if (userAnswer === correctAnswer) {
      setScore((prev) => prev + 1);
      setCorrectWords((prev) => [...prev, word]);
    } else {
      setMissedWords((prev) => [...prev, word]);
      setGuessesLeft((prev) => {
        const newGuesses = prev - 1;
        if (newGuesses === 0) {
          setMenuState(MENU_STATES.GUESS_WORD_END);
        }
        return newGuesses;
      });
    }
  
    const newWordsLeft = wordsLeft.filter((el) => el.word !== word.word);
    setWordsLeft(newWordsLeft);
  };
  

  //Manage Menu States
  const changeMenuState = (newState) => {
    if(newState === MENU_STATES.GUESS_WORD){
      loadGame(100);
    }
    setMenuState(newState)
  }
  // Retry after getting 3 words wrong
  const retry = () => {
    loadGame(100);
    setMissedWords([]);
    setScore(0);
    setGuessesLeft(3);
    setMenuState("guess-word");

  }


  // Guess Word Loop
  useEffect(() => {
    if(menuState == "guess-word"){

      pickNextWord()
    }
  }, [wordsLeft]); 


  // Log missed words
  useEffect(() => {
    console.log("Missed Words: ", missedWords)
  },[missedWords])

  return (
    <div>
      {
        menuState === "start" && <InitialScreen
        changeMenuState={changeMenuState}
        />
      }
      {
        menuState === "guess-word" && 
      <GuessWord 
        guessesLeft={guessesLeft}
        threeOptions={threeOptions}
        word={word}
        verifyAnswer={verifyAnswer}
        wordsLeft={wordsLeft}
        correctWords={correctWords}
        missedWords={missedWords}
        jpcore={jpcore}
      />
      }
      {
        menuState === "guess-word-end" &&
        <GuessWordEnd
          score={score}
          retry={retry}
          missedWords={missedWords}
        />
      }
    </div>
  )
}

export default App
