import {useState} from "react";
import {Clock} from "./Clock.tsx";

export function SecondsClick(props: { date: Date, advance: () => void  }) {
    const [score, setScore] = useState(0);
    const [buttonColor, setButtonColor] = useState("green");
    const [start, setStart] = useState(Math.floor(Math.random() * (900 + 1)));
    const [end, setEnd] = useState(start + 100);
    const [startDate] = useState(new Date());

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
        const currentPosition = (new Date().getTime() - startDate.getTime()) % 1000;
        console.log(start);
        console.log(end);
        // TODO, scoring is still incorrect
        if (currentPosition >= start && currentPosition <= end) {
            setScore(score => score + 1);
            setButtonColor("green")
        } else {
            setButtonColor("red")
        }
        GenerateNewClickArea();
    }

    function ScoreBoard(props: { currentScore: number }) {
        return (<> <p> Score:{props.currentScore} </p> </>);
    }

    return (
        <>
            <div className="buttonScore">
                <BigButton color={buttonColor}/>
                <ScoreBoard currentScore={score}/>
                <button onClick={props.advance}>Skip game 🤯</button>
            </div>

            <div>
                <Clock start={start} end={end} date={props.date}/>
            </div>
        </>
    );
}