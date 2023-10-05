import {useState} from "react";
import {Clock} from "./Clock.tsx";
import './seconds-click.scss'
import Button from "react-bootstrap/Button";
import clockButton from "/src/assets/Clock game/clockButton.png";

export function SecondsClick(props: { advance: () => void, setScore: React.Dispatch<React.SetStateAction<number>> }) {
    const [showStart, setShowStart] = useState(true);
    const [showAdvance, setShowAdvance] = useState(false);
    const [message, setMessage] = useState<string | undefined>("Press the button below at the right time, click start to start the clock!")
    const [startDate, setStartDate] = useState(new Date());


    const [start, setStart] = useState(Math.floor(Math.random() * (900 + 1)));
    const [end, setEnd] = useState(start + 100);
    const [text, setText] = useState("");
    const [currentRound, setCurrentRound] = useState(1);
    const AMOUNT_OF_ROUNDS = 5;

    function startGame() {
        setShowStart(false);
        setStartDate(new Date());
        setMessage("Click at the right time!");
    }

    function endGame() {
        setMessage(undefined);
        setShowAdvance(true);
    }

    function generateNewClickArea() {
        const newStartTime = Math.floor(Math.random() * (900 + 1));
        setStart(newStartTime);
        setEnd(newStartTime + 100)
    }

    function buttonPress() {
        if (showStart || showAdvance) {
            return;
        }
        // Calculate the score.
        const currentPosition = (new Date().getTime() - startDate.getTime()) % 1000;
        if (currentPosition >= start && currentPosition <= end) {
            props.setScore(score => score + 100);
            setText("Perfect!")
        } else if (currentPosition >= (start - 50) && currentPosition <= (end + 50)) {
            props.setScore(score => score + 50);
            setText("Close!")
        } else {
            let difference : number = 0;
            if (currentPosition < start){
                difference = start - currentPosition;
            } else {
                difference = currentPosition - end;
            }
            setText(difference + " milliseconds off")
        }

        // Continue the game
        if (currentRound == AMOUNT_OF_ROUNDS) {
            endGame();
        } else {
            setCurrentRound(currentRound+1)
            generateNewClickArea();
        }
    }

    return (
        <>
            <div>
                {!showStart && !showAdvance && <Clock start={start} end={end}/> }
            </div>
            <div className="clock-game-screen__BG">
                <div className="clock-game-screen__image">
                </div>
                <div className="clock-game-screen__game">
                    <div className="message">
                    <p className="uitleg">{message}</p>
                    {showStart && <Button onClick={startGame}>Start</Button>}
                    {showAdvance && <Button onClick={props.advance}>Finish</Button>}
                    </div>

                    <h4 className="result">{text}</h4>

                    <img className="big-button" src={clockButton} onMouseDown={buttonPress}></img>
                </div>
            </div>
        </>
    );
}
