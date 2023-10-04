import {ChangeEvent, useState} from "react";
import Button from 'react-bootstrap/Button';
import highScoreModel from "./models/high-score-model.ts";
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

export function HighScore(props: { score: number }) {
    const [name, setName] = useState("");
    const [highScores, setHighScores] = useState<highScoreModel[]>(() => {
        const stored = localStorage.getItem("highScores");
        return stored ? JSON.parse(stored) : [];
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    function submit() {
        if (!name) {
            return;
        }
        setHighScores(s => {
            const newScores = [...s, {name: name, score: props.score}].sort((a, b) => b.score - a.score);
            localStorage.setItem("highScores", JSON.stringify(newScores));
            return newScores;
        })
    }

    return <div>
        <h3>Your score: {props.score}</h3>
        <Form.Label htmlFor="inputPassword5">Enter your name</Form.Label>
        <Form.Control placeholder="TimeMaster1337" onChange={handleChange} value={name}/>

        <Button variant="primary" type="submit" onClick={submit} disabled={!name}>
            Submit
        </Button>

        <h3>High scores</h3>
        <ListGroup as="ol" numbered>
            {highScores.map(s => <ListGroup.Item as="li">{s.name} : {s.score}</ListGroup.Item>)}
        </ListGroup>
    </div>
}
