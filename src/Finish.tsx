import Button from "react-bootstrap/Button";
import {HighScore} from "./HighScore.tsx";
import './Finish.scss'

export function Finish(props: { advance: () => void, score: number }) {
    return <div className="finish-game-screen__BG">
        {/* <header className="finish-screen__time__container">
            <h1 className='finish-screen__time'>{date.toLocaleTimeString()}</h1>
        </header> */}
        <div className="finish-game-screen__image">
            <div className='test highscore'>
                <HighScore score={props.score}></HighScore>
                
            </div>
        </div>
        <Button className="restart" onClick={props.advance}>Restart!</Button>
    </div>
}
