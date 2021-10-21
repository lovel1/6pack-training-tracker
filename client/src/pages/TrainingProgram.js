import { Icon } from "@iconify/react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { EmptyTrainingDayCard } from "../components/cards/emptyTrainingDayCard";
import { TrainingDayCard } from "../components/cards/trainingDayCard";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

export const TrainingProgram = () => {
    const user = useSelector((state) => state.user)

    return (

        <div className="training-program-page">
            <div className="nav">
                <Link to="/">
                    <button className="nav-button shadow">
                        <Icon icon="ic:round-arrow-back-ios" />
                    </button>
                </Link>
            </div>

            <div className="training-program-container">
                <h1 className="title">Your training program</h1>

                {Object.keys(user).length !== 0 ? Object.keys(user.trainingThemes).map(key => {
                    if (!user.trainingThemes[key]) {
                        return <EmptyTrainingDayCard day={capitalizeFirstLetter(key)} key={key}/>
                    } else {
                        return <TrainingDayCard day={capitalizeFirstLetter(key)} theme={user.trainingThemes[key]} key={key}/>
                    }
                    
                }) : null}

            </div>
        </div>
    )
}