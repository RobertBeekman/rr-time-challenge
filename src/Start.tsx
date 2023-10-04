import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import './Start.scss'

export function Start(props: { advance: () => void }) {
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
        <div className="start-screen__gear-2 rotating-2"></div>
        <div className="start-screen__gear-3 rotating-2"></div>

        <div className='test'>
            <Button onClick={props.advance}>Blow my mind 🤯</Button>
        </div>
    </div>
}
