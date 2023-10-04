import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import {HighScore} from "./HighScore.tsx";
import './Finish.scss'

export function Finish(props: { advance: () => void }) {
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer)
        }
    });

    return <div className="start-screen__BG">
        <header className="start-screen__time__container">
            <h1 className='start-screen__time'>{date.toLocaleTimeString()}</h1>
        </header>
        <div className="start-screen__gear rotating"></div>
        <div className='test'>
            <HighScore score={123}></HighScore>
            <Button onClick={props.advance}>Restart!</Button>
        </div>
    </div>
}
