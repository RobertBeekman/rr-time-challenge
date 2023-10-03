import {useEffect, useState} from 'react'
import {Game} from "./Game.tsx";
import './App.scss'

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
                <h1>{date.toUTCString()}</h1>
            </header>

            <div className="gameContainer">
                <Game/>
            </div>
        </div>
    );
}

export default App
