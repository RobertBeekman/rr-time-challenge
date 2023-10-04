import {useState} from "react";
import {Clock} from "./Clock.tsx";

export function SecondsClick(props: { advance: () => void, setScore: React.Dispatch<React.SetStateAction<number>> }) {
    const [buttonColor, setButtonColor] = useState("green");
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

    function BigButton(props: { color: string }) {
        return (<>
            <svg height="100" width="100">
                <circle cx="50" cy="50" r="40" stroke="black" fill={props.color} onMouseDown={ButtonPress}/>
            </svg>
        </>);
    }

    function ButtonPress() {
        // Check the accuracy
        const currentPosition = (new Date().getTime() - startDate.getTime()) % 1000;

        if (currentPosition >= start && currentPosition <= end) {
            props.setScore(score => score + 100);
            setButtonColor("green")
        } else if (currentPosition >= (start - 50) && currentPosition <= (end + 50)) {
            setButtonColor("orange")
            props.setScore(score => score + 50);
        } else {
            setButtonColor("red")
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
                <div className="clock-game-screen__image"></div>
                <div className="clock-game-screen__game"> 
                    <BigButton color={buttonColor}/>
                </div>
               
            </div>
        </>
    );
}
