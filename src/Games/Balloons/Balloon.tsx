import './Balloon.scss'
import {BalloonState} from "./BalloonState.ts";

export function Balloon(props: { index: number, state: BalloonState, onClick: () => void }) {
    function getResultClass() {
        if (props.state.offset && props.state.offset < 200) {
            return "text-success";
        }
        if (props.state.offset && props.state.offset < 600) {
            return "text-warning";
        }
        return "text-danger";
    }

    const resultClasses = `click-result ${getResultClass()}`
    return <div className={"animal animal_" + props.index} onClick={props.onClick}>
        {props.state.offset !== undefined && <div className="soup"/>}
        <div className="click-result">
            {props.state.revealed ? <span>{props.state.time} sec</span> : ''}
            {props.state.offset !== undefined && <span className={resultClasses}>{Math.round(props.state.offset ?? 0)} ms</span>}
        </div>
    </div>
}
