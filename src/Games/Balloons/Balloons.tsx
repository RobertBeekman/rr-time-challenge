import {Balloon} from "./Balloon.tsx";
import './Balloons.scss'

export function Balloons() {
    const balloons = [2,5,6,4];
    return (
        <div className="balloons">
            {balloons.map(b => <Balloon time={b}></Balloon>)}
        </div>
    )
}
