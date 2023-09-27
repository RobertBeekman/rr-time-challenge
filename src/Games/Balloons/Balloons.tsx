import {Balloon} from "./Balloon.tsx";
import './Balloons.scss'
import {BalloonState} from "./BalloonState.ts";
import {useEffect, useState} from "react";

export function Balloons() {
    // Whip up random numbers for the balloons
    let uniqueNumbers = [];
    while (uniqueNumbers.length < 4) {
        const r = Math.floor(Math.random() * 9) + 1;
        if (uniqueNumbers.indexOf(r) === -1) {
            uniqueNumbers.push(r)
        }
    }
    const [balloons, setBalloons] = useState<BalloonState[]>(uniqueNumbers.map(n => new BalloonState(n, true)));
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [scores, setScores] = useState<number[]>([])
    const [message, setMessage] = useState("Click each balloon on time!")

    function startGame() {
        setBalloons(balloons.map(b => new BalloonState(b.time, false)))
        setStartTime(new Date());
    }

    useEffect(() => {
        setTimeout(() => startGame(), 2000)
    }, []);


    function balloonClicked(index: number) {
        const balloon = balloons[index];
        if (!startTime || balloon.revealed) {
            return;
        }

        const seconds = (new Date().getTime() - startTime.getTime()) / 1000;
        const difference = Math.abs(seconds - balloon.time);
        const next = balloons.map(b => new BalloonState(b.time, b.revealed));
        next[index].revealed = true;

        setBalloons(next);
        setMessage(difference < 0.5 ? "Great!" : "Not great :c");
        setScores([...scores, difference])
    }

    return (
        <>
            <div className="balloons">
                {balloons.map((b, i) => <Balloon key={i} showTime={b.revealed} time={b.time} onClick={() => balloonClicked(i)}></Balloon>)}
            </div>
            <p>{message}</p>
            <p className="scores">
                {scores.map((s, i) => <span key={i}>{s}<br/></span>)}
            </p>
        </>
    )
}
