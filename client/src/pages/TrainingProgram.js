import { Icon } from "@iconify/react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { EmptyTrainingDayCard } from "../components/cards/emptyTrainingDayCard";
import { TrainingDayCard } from "../components/cards/trainingDayCard";
import { UserContext } from "../context/user/userContext";

export const TrainingProgram = () => {

    const { user } = useContext(UserContext)
    const currentProgramData = user

    return (

        <>

            <div className="nav">
                <Link to="/">
                    <button className="nav-button shadow">
                        <Icon icon="ic:round-arrow-back-ios" />
                    </button>
                </Link>
            </div>

            <div className="training-program-container">
                <h1 className="title">Your training program</h1>

                {currentProgramData.plan.map(planElem => {
                    if (!planElem.exercises.length) {
                        return <EmptyTrainingDayCard day={planElem.day}/>
                    } else {
                        return <TrainingDayCard day={planElem.day} theme={planElem.training_theme}/>
                    }
                    
                })}
            </div>

        </>
    )
}