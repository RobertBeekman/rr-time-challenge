import React, {useState} from "react";

export function SecondsClick(props : { date: Date, advance: () => void })
{
    const [score, setScore] = useState(0);
    const [buttonColor, setButtonColor] = useState("red");

    function BigButton(props: { whenPressed: React.MouseEventHandler<SVGCircleElement> | undefined, color : string }) {
        return (<>
            <svg height="100" width="100">
                <circle cx="50" cy="50" r="40" stroke="black" fill={props.color} onClick={props.whenPressed}/>
            </svg>
        </>);
    }

    function Buttonpress() {
        if (props.date.getMilliseconds() > 900 || props.date.getMilliseconds() < 100){
            setScore(score => score +1);
            setButtonColor("green")
        } else {
            setButtonColor("red")
        }
        console.log(props.date.getMilliseconds());
    }

    function ScoreBoard(props: { currentScore:number}) {
        return (<> <p> Score:{props.currentScore} </p> </>);
    }

    return (
        <>
            <BigButton whenPressed={() => Buttonpress()} color={buttonColor}/>
            <ScoreBoard currentScore={score}/>
            <button onClick={props.advance}>Skip game</button>
        </>
    );
}

