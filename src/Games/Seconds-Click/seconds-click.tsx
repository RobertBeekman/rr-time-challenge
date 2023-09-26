import React from "react";

export class SecondsClick extends React.Component{
    state = {score: 0, buttonColor: "red"};

    constructor(props : { date: Date }) {
        super(props);
    }

    render(){
        return (
            <>
                <this.BigButton whenPressed={() => this.Buttonpress()} color={this.state.buttonColor}/>
                <this.ScoreBoard currentScore={this.state.score}/>
            </>
        );
    }

    BigButton(props: { whenPressed: React.MouseEventHandler<SVGCircleElement> | undefined, color : string }) {
        return (<>
            <svg height="100" width="100">
                <circle cx="50" cy="50" r="40" stroke="black" fill={props.color} onClick={props.whenPressed}/>
            </svg>
        </>);
    }

    Buttonpress() {
        if (this.props.date.getMilliseconds() > 900 || this.props.date.getMilliseconds() < 100){
            this.setState({score: this.state.score +1, buttonColor: "green"});
        } else {
            this.setState({buttonColor: "red"});
        }
        console.log(this.props.date.getMilliseconds());
    }

    ScoreBoard(props: { currentScore:number}) {
        return (<> <p> Score:{props.currentScore} </p> </>);
    }
}

