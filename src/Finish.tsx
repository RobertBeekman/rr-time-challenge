import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import {HighScore} from "./HighScore.tsx";
import './Finish.scss'

export function Finish(props: { advance: () => void, score: number }) {
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer)
        }
    });

    return <div className="finish-game-screen__BG">
        {/* <header className="finish-screen__time__container">
            <h1 className='finish-screen__time'>{date.toLocaleTimeString()}</h1>
        </header> */}
        <div className="finish-game-screen__image">
            <div className='test highscore'>
                <HighScore score={props.score}></HighScore>
                <Button onClick={props.advance}>Restart!</Button>
            </div>
        </div>
    </div>
}
