import {useState} from "react";
import {SecondsClick} from "./Games/Seconds-Click/seconds-click.tsx";
import {Balloons} from "./Games/Balloons/Balloons.tsx";
import Button from 'react-bootstrap/Button';

export function Game() {
    const [state, setState] = useState(State.Start);

    function advance() {
        setState(s => {
            if (s === State.Start)
                return State.SecondsClick;
            if (s === State.SecondsClick)
                return State.BalloonPopper;
            if (s === State.BalloonPopper)
                return State.Finish;
            return State.Start;
        })
    }

    function restart() {
        setState(State.Start);
    }

    if (state === State.SecondsClick) {
        return <SecondsClick advance={advance}></SecondsClick>
    }
    if (state === State.BalloonPopper) {
        return <Balloons advance={advance}></Balloons>
    }
    if (state === State.Finish) {
        return <div>
            <h3>You've made it!</h3>
            <p>That was great, remember all the good times you had.</p>
            <Button onClick={restart}>Start over ⏱️</Button>
        </div>
    }
    return <div>
        <Button onClick={advance}>Blow my mind 🤯</Button>
    </div>
}

enum State {
    Start,
    SecondsClick,
    BalloonPopper,
    Finish
}
