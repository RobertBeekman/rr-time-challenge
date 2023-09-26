import './Balloon.scss'
import {useState} from "react";

export function Balloon(props: { time: number }) {
    const [hueRotation] = useState(Math.floor(Math.random() * 321));
    return <div className="balloon" style={{filter: "hue-rotate(" + hueRotation + "deg)"}}>
        <span>{props.time}</span>
    </div>
}
