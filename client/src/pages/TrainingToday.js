import React from "react";
import { Link } from "react-router-dom";
import dayjs from 'dayjs'
import { Icon } from "@iconify/react";
import { TodayTrainingCard } from "../components/cards/todayTrainingCard";
import { useSelector } from "react-redux";

export const TrainingToday = () => {

    // Creating new date
    const date = new Date().toISOString()

    // Formatting previously created date into day of a week using dayjs
    const day = dayjs(date).format('dddd')

    // Getting all needed states from the global store
    const user = useSelector((state) => state.user)
    const exercises = useSelector((state) => state.exercises)
    const training = useSelector((state) => state.training)

    // Filtering 'exercises'-array to get the data related to a specific day
    const filteredExercises = exercises.filter(exercise => exercise.day === day.toLowerCase())

    return (

        <div className="training-today-page">
            <div className="nav">
                <Link to="/">
                    <button className="nav-button shadow">
                        <Icon icon="ic:round-arrow-back-ios" />
                    </button>
                </Link>
            </div >

            <h1 className="title">
                Training plan for {day}
            </h1>

            <div>
                {filteredExercises.map(exercise => (
                    <TodayTrainingCard 
                    exercise_name={exercise.exerciseName} 
                    reps={exercise.reps} 
                    sets={exercise.sets} 
                    completed={Object.keys(training).length !== 0 ? training.completedExercises.includes(exercise._id) : false}
                    key={exercise._id} 
                    id={exercise._id}
                    />
                ))}
            </div>

            <div className="bottom-title shadow">
                <p>{Object.keys(user).length !== 0 ? user.trainingThemes[day.toLowerCase()] : null}</p>
            </div>
        </div>

    )
}