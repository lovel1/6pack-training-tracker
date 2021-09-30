import { Icon } from "@iconify/react";
import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { NewExerciseButton } from "../components/buttons/newExerciseButton";
import { EditableExercise } from "../components/cards/editableExercise";
import { ExerciseEditor } from "../components/forms/exerciseEditor";
import { UserContext } from "../context/user/userContext";

export const TrainingDay = () => {
    const { day } = useParams()
    const { user } = useContext(UserContext)
    const [editorShow, setEditorShow] = useState(false)

    const dayData = user.plan.find(element => element.day.toLowerCase() === day)

    console.log(dayData)

    const showExerciseEditor = () => {
        setEditorShow(prevState => !prevState)
    }

    return(

        <>

            <div className="nav">
                <Link to={'/training/current_program'}>
                    <button className="nav-button shadow">
                        <Icon icon="ic:round-arrow-back-ios" />
                    </button>
                </Link>
            </div>

            <div>
                <h1 className="title">Training plan for {dayData.day}</h1>

                <div className="training-program-element reversed shadow">
                    <div>
                        <p>Training Theme</p> 
                        <span>{dayData.training_theme}</span>
                    </div>
                    <div className="right-column">
                        <button className="nav-button mr-1">
                            <Icon icon="eva:edit-outline" />
                        </button>

                        <button className="nav-button">
                            <Icon icon="ci:close-small" />
                        </button>
                    </div>
                </div>

                {dayData.exercises.map(element => (

                    <EditableExercise name={element.exercise_name} sets={element.sets} reps={element.reps} />

                ))}

                {editorShow && <ExerciseEditor func={showExerciseEditor}/>}

                {!editorShow && <NewExerciseButton func={showExerciseEditor}/>}
               
            </div>

        </>
    )
}