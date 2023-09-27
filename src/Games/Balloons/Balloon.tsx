import './Balloon.scss'
import {useState} from "react";

export function Balloon(props: { showTime: boolean, time: number, onClick: () => void }) {
    const [hueRotation] = useState(Math.round(Math.random() * 7) * 45);
    return <div className="balloon" style={{filter: "hue-rotate(" + hueRotation + "deg)"}}  onClick={props.onClick}>
        {props.showTime ? <span>{props.time} sec</span> : ''}
    </div>
}
