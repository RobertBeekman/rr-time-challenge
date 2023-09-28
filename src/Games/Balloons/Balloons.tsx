import {Balloon} from "./Balloon.tsx";
import './Balloons.scss'
import {BalloonState} from "./BalloonState.ts";
import {useState} from "react";

export function Balloons() {
    const [showStart, setShowStart] = useState(true);
    const [balloons, setBalloons] = useState<BalloonState[]>([]);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [message, setMessage] = useState("Click start to view your seconds...")

    function prepareGame() {
        let uniqueNumbers = [];
        while (uniqueNumbers.length < 4) {
            const r = Math.floor(Math.random() * 9) + 1;
            if (uniqueNumbers.indexOf(r) === -1) {
                uniqueNumbers.push(r)
            }
        }

        setShowStart(false);
        setBalloons(uniqueNumbers.map(n => new BalloonState(n, 0, true)));
        setTimeout(() => startGame(), 3000)
        setMessage("Memorize your seconds... 👀");
    }

    function startGame() {
        setBalloons(b => b.map(b => new BalloonState(b.time, 0, false)))
        setStartTime(new Date());
        setMessage("Go!");
    }

    function endGame() {
        setMessage("Good job! 😎");
        setShowStart(true);
    }

    function balloonClicked(index: number) {
        const balloon = balloons[index];
        if (!startTime || balloon.revealed) {
            return;
        }

        const seconds = (new Date().getTime() - startTime.getTime()) / 1000;
        const difference = Math.abs(seconds - balloon.time);
        const next = balloons.map(b => new BalloonState(b.time, b.offset, b.revealed));
        next[index].revealed = true;
        next[index].offset = difference;

        setBalloons(next);
        setMessage(difference < 0.5 ? "Great!" : "Not great :c");

        if (next.every(b => b.revealed)) {
            endGame();
        }
    }

    return (
        <>
            <p>Remember the seconds and click on each balloon after enough time has passed!</p>
            <div className="balloons">
                {balloons.map((b, i) => <Balloon key={i} state={b} onClick={() => balloonClicked(i)}/>)}
            </div>
            <p>{message}</p>
            {showStart && <button onClick={prepareGame}>Start</button>}
        </>
    )
}
