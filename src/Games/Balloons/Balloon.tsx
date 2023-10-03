import './Balloon.scss'
import {useState} from "react";
import {BalloonState} from "./BalloonState.ts";

export function Balloon(props: { state: BalloonState, onClick: () => void }) {
    const [hueRotation] = useState(Math.round(Math.random() * 7) * 45);

    function getResultClass() {
        if (props.state.offset * 1000 < 200) {
            return "green";
        }
        if (props.state.offset * 1000 < 600) {
            return "yellow";
        }
        return "red";
    }

    const resultClasses = `result ${getResultClass()}`
    return <div>
        <div className="balloon" style={{filter: "hue-rotate(" + hueRotation + "deg)"}} onClick={props.onClick}>
            {props.state.revealed ? <span>{props.state.time} sec</span> : ''}
        </div>
        {props.state.offset !== 0 && <div className={resultClasses}><p>{Math.round(props.state.offset * 1000)} ms</p></div>}
    </div>
}
