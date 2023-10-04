import {Balloon} from "./Balloon.tsx";
import './Balloons.scss'
import {BalloonState} from "./BalloonState.ts";
import {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";

export function Balloons(props: { advance: () => void, setScore: React.Dispatch<React.SetStateAction<number>> }) {
    const [showStart, setShowStart] = useState(true);
    const [showAdvance, setShowAdvance] = useState(false);
    const [balloons, setBalloons] = useState<BalloonState[]>([]);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [message, setMessage] = useState<string | undefined>("Click start to view your seconds...")

    useEffect(() => {
        let uniqueNumbers = [];
        while (uniqueNumbers.length < 4) {
            const r = Math.floor(Math.random() * 9) + 1;
            if (uniqueNumbers.indexOf(r) === -1) {
                uniqueNumbers.push(r)
            }
        }
        setBalloons(uniqueNumbers.map(n => new BalloonState(n, undefined, false)));
    }, []);

    function prepareGame() {
        setBalloons(b => b.map(b => new BalloonState(b.time, undefined, true)))
        setShowStart(false);
        setTimeout(() => startGame(), 3000)
        setMessage("Memorize your seconds... 👀");
    }

    function startGame() {
        setBalloons(b => b.map(b => new BalloonState(b.time, undefined, false)))
        setStartTime(new Date());
        setMessage("Go!");
    }

    function endGame() {
        setMessage(undefined);
        setShowAdvance(true);
    }

    function balloonClicked(index: number) {
        const balloon = balloons[index];
        if (!startTime || balloon.offset !== undefined) {
            return;
        }

        const ms = (new Date().getTime() - startTime.getTime());
        const difference = Math.abs(ms - (balloon.time * 1000));
        const next = balloons.map(b => new BalloonState(b.time, b.offset, b.revealed));
        next[index].offset = difference;

        setBalloons(next);
        if (difference < 200) {
            props.setScore(s => s + 100);
        } else if (difference <  600) {
            props.setScore(s => s + 50);
        }
        if (next.every(b => b.offset !== undefined)) {
            endGame();
        }
    }

    return (
        <>
            <div className="animal-game-screen__BG">
                <div className="animal-game-screen__image">
                <div className="balloons">
                    {balloons.map((b, i) => <Balloon index={i} key={i} state={b} onClick={() => balloonClicked(i)}/>)}
                </div>
                <p>{message}</p>
                {showStart && <Button onClick={prepareGame}>Start</Button>}
                {showAdvance && <Button onClick={props.advance}>Finish</Button>}
                </div>
            </div>
        </>
    )
}
