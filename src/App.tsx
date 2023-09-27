import {useEffect, useState} from 'react'
import {SecondsClick} from './Games/Seconds-Click/seconds-click.tsx'
import './App.scss'
import {Balloons} from "./Games/Balloons/Balloons.tsx";

function App() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer)
        }
    });

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    R&R Time Challenge Template 😀
                </p>
                <b>{date.toUTCString()}</b>
            </header>

            <SecondsClick date={date}/>
            <Balloons></Balloons>
        </div>
    );
}

export default App
