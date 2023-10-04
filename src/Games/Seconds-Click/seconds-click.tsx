import {useState} from "react";
import {Clock} from "./Clock.tsx";
import Button from "react-bootstrap/Button";

export function SecondsClick(props: { advance: () => void  }) {
    const [score, setScore] = useState(0);
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
                <circle cx="50" cy="50" r="40" stroke="black" fill={props.color} onClick={ButtonPress}/>
            </svg>
        </>);
    }

    function ButtonPress() {
        // Check the accuracy
        const currentPosition = (new Date().getTime() - startDate.getTime()) % 1000;
        if (currentPosition >= start && currentPosition <= end) {
            setScore(score => score + 1);
            setButtonColor("green")
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

    function ScoreBoard(props: { currentScore: number }) {
        return (<> <p> Score:{props.currentScore} </p> </>);
    }

    return (
        <>
            <div className="buttonScore">
                <BigButton color={buttonColor}/>
                <ScoreBoard currentScore={score}/>
                <Button onClick={props.advance}>Skip game 🤯</Button>
            </div>

            <div>
                <Clock start={start} end={end}/>
            </div>
        </>
    );
}
