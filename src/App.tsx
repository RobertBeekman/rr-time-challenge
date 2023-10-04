import {useState} from 'react'
import {SecondsClick} from "./Games/Seconds-Click/seconds-click.tsx";
import {Balloons} from "./Games/Balloons/Balloons.tsx";
import {Finish} from "./Finish.tsx";
import {Start} from "./Start.tsx";
import './App.scss'

function App() {
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

    if (state === State.SecondsClick) {
        return <SecondsClick advance={advance}/>
    }
    if (state === State.BalloonPopper) {
        return <Balloons advance={advance}/>
    }
    if (state === State.Finish) {
        return <Finish advance={advance}/>
    }
    return <Start advance={advance}/>
}

enum State {
    Start,
    SecondsClick,
    BalloonPopper,
    Finish
}

export default App
