import React, {useEffect, useState} from "react";
import {Container, Row, Col, Card} from "react-bootstrap";
import {fetch_workouts} from "../database/workout";
import {useNavigate, useParams} from "react-router-dom";

export function Preview() {
    const { uid } = useParams()
    const [workouts, setWorkouts] = useState([]);
    const [gifs, setGifs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch_workouts().then(value => {
            let workOutArr = [];
            let gifArr = [];
            let instructionsArr = [];
            Object.values(value).forEach((val) => {
                workOutArr.push(val["Exercise Name"])
                gifArr.push(val["Image"])
                instructionsArr.push(val["Instructions"])
            })
            setWorkouts(workOutArr);
            setGifs(gifArr)
        })
    }, []);

    return (
        <div>
            <h2>Preview Workout</h2>
            <h6>Total Time: 10 min</h6>
            <h6>Total Workouts: {workouts.length}</h6>
            <button onClick={() => {
                navigate('/home/'+uid);
            }}>Start</button>
            <Container>
                <Row xs={1} md={2}>
                    {Object.keys(workouts).map((value) => {
                        return <Col key={value} style={{width:"48%", margin:"1%"}} >
                            <Card>
                                <Card.Header>{parseInt(value)+1}.{workouts[value]}</Card.Header>
                                <Card.Img style={{height:"10%"}} src= {gifs[value]} alt={"gif"} />
                            </Card>
                        </Col>
                    })}
                </Row>
            </Container>
        </div>
    );
}