import {useState} from "react";
import {Clock} from "./Clock.tsx";
import './seconds-click.scss'

export function SecondsClick(props: { advance: () => void, setScore: React.Dispatch<React.SetStateAction<number>> }) {
    const [start, setStart] = useState(Math.floor(Math.random() * (900 + 1)));
    const [end, setEnd] = useState(start + 100);
    const [startDate] = useState(new Date());
    const [currentRound, setCurrentRound] = useState(1);
    const AMOUNT_OF_ROUNDS = 5;

    function GenerateNewClickArea() {
        const newStartTime = Math.floor(Math.random() * (900 + 1));
        setStart(newStartTime);
        setEnd(newStartTime + 100)
    }

    function BigButton() {
        return (<>
        <img className="big-button" src="src/assets/Clock game/clockButton.png" onMouseDown={ButtonPress}></img>
        </>);
    }

    function ButtonPress() {
        // Check the accuracy
        const currentPosition = (new Date().getTime() - startDate.getTime()) % 1000;
        if (currentPosition >= start && currentPosition <= end) {
            props.setScore(score => score + 1);
        } else {
        }

        // Continue the game
        if (currentRound == AMOUNT_OF_ROUNDS) {
            props.advance();
        } else {
            setCurrentRound(currentRound+1)
            GenerateNewClickArea();
        }
    }

    return (
        <>
            <div>
                <Clock start={start} end={end}/>
            </div>
            <div className="clock-game-screen__BG">
                <div className="clock-game-screen__image"> <BigButton/> </div>
                <div className="clock-game-screen__game"> </div>
               
            </div>
        </>
    );
}
