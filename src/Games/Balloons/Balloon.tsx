import './Balloon.scss'
import {useState} from "react";
import {BalloonState} from "./BalloonState.ts";

export function Balloon(props: { state: BalloonState, onClick: () => void }) {
    const [hueRotation] = useState(Math.round(Math.random() * 7) * 45);
    return <div>
        <div className="balloon" style={{filter: "hue-rotate(" + hueRotation + "deg)"}} onClick={props.onClick}>
            {props.state.revealed ? <span>{props.state.time} sec</span> : ''}
        </div>
        {props.state.offset !== 0 && <p>{props.state.offset}</p>}
    </div>
}
