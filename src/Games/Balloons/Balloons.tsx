import {Balloon} from "./Balloon.tsx";
import './Balloons.scss'
import {BalloonState} from "./BalloonState.ts";
import {useState} from "react";
import Button from "react-bootstrap/Button";

export function Balloons(props: { advance: () => void }) {
    const [showStart, setShowStart] = useState(true);
    const [showAdvance, setShowAdvance] = useState(false);
    const [balloons, setBalloons] = useState<BalloonState[]>([]);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [message, setMessage] = useState<string | undefined>("Click start to view your seconds...")

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
        setMessage(undefined);
        setShowAdvance(true);
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
        setMessage(difference < 0.5 ? "Wow!" : "Ooooh!!");

        if (next.every(b => b.revealed)) {
            endGame();
        }
    }

    return (
        <>
            <div className="animal-game-screen__BG">
                <div className="animal-game-screen__image">
                <div className="balloons">
                    {balloons.map((b, i) => <Balloon key={i} state={b} onClick={() => balloonClicked(i)}/>)}
                </div>
                <p>{message}</p>
                {showStart && <Button onClick={prepareGame}>Start</Button>}
                {showAdvance && <Button onClick={props.advance}>Finish</Button>}
                </div>
            </div>
        </>
    )
}
