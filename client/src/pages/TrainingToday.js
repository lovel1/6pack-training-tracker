import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user/userContext";
import dayjs from 'dayjs'
import { Icon } from "@iconify/react";
import { TodayTrainingCard } from "../components/cards/todayTrainingCard";

export const TrainingToday = () => {

    const {user, date} = useContext(UserContext)

    // const weekday = dayjs(date).format('dddd')
    const weekday = 'Tuesday'

    const todayProgramData = user
    .plan.find(planElem => planElem.day.toLowerCase() === weekday.toLowerCase())

    console.log(todayProgramData)

    return (

        <>

            <div className="nav">
                <Link to="/">
                    <button className="nav-button shadow">
                        <Icon icon="ic:round-arrow-back-ios" />
                    </button>
                </Link>
            </div >

            <h1 className="title">
                Training plan for {weekday}
            </h1>

            <div>
                {todayProgramData.exercises.map(exercise => (
                    <TodayTrainingCard exercise_name={exercise.exercise_name} reps={exercise.reps} sets={exercise.sets}/>
                ))}
            </div>

            <div className="bottom-title shadow">
                <p>{todayProgramData.training_theme}</p>
            </div>

        </>

    )
}