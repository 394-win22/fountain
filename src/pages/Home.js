import React from "react";
import {fetch_workouts, pseudorandom} from "../database/workout";
import {useEffect, useState} from 'react';
import {WorkoutArea} from "../components/workoutArea";
import {WorkoutFinished} from "../components/workoutFinished";
import {useParams} from "react-router-dom";

function Home() {
    const { uid } = useParams()
    const [instructions, setInstructions] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [gifs, setGifs] = useState([]);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        fetch_workouts().then(value => {
            let workOutArr = [];
            let gifArr = [];
            let instructionsArr = [];
            Object.values(value).map((value) => {
                workOutArr.push(value["Exercise Name"])
                gifArr.push(value["Image"])
                instructionsArr.push(value["Instructions"])
            })
            setInstructions(instructionsArr);
            setWorkouts(workOutArr);
            setGifs(gifArr)
        })
    }, []);
    

    return (
        <div className="home-wrapper m-3">
            {finished ?
                <WorkoutFinished />
                : <WorkoutArea workouts={workouts} instructions={instructions} gifs={gifs} setFinished={setFinished} uid={uid}/>
            }
        </div>
    );
}



export default Home;