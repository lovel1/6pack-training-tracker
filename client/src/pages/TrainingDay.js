import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NewExerciseButton } from "../components/buttons/newExerciseButton";
import { EditableExercise } from "../components/cards/editableExercise";
import { ExerciseEditor } from "../components/forms/exerciseEditor";
import {useParams} from "react-router-dom"
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { useSelector } from "react-redux";
import { addExercise, editExercise } from "../actions/exercisesActions";
import { TrainingThemeEditor } from "../components/forms/trainingThemeEditor";
import { CSSTransition, TransitionGroup } from "react-transition-group"

export const TrainingDay = () => {
    const { day } = useParams()
    const user = useSelector((state) => state.user)
    const exercises = useSelector((state) => state.exercises)
    const filteredExercises = exercises.filter(exercise => exercise.day === day)
    const [editorShow, setEditorShow] = useState(false)
    const [themeEditorShow, setThemeEditorShow] = useState(false)
    const [formExerciseName, setFormExerciseName]  = useState('')
    const [formLink, setFormLink]  = useState('')
    const [formReps, setFormReps]  = useState('')
    const [formSets, setFormSets]  = useState('')
    const [formAction, setFormAction]  = useState('')
    const [formId, setFormId] = useState('')
    const [formTrainingTheme, setFormTrainingTheme] = useState('')

    const clearForm = () => {
        setFormExerciseName('')
        setFormLink('')
        setFormReps('')
        setFormSets('')
    }

    const handleSubmit = async event => {
        event.preventDefault()
        const token = JSON.parse(window.localStorage.getItem('loggedUser'))
        if (formAction === 'add') {
           await addExercise(token, {day: day, exerciseName: formExerciseName, sets: formSets, reps: formReps, description: formLink})
           setEditorShow(false)
           clearForm()
        } else if (formAction === 'edit') {
            await editExercise({_id: formId, day: day, exerciseName: formExerciseName, sets: formSets, reps: formReps, description: formLink})
            setEditorShow(false)
            clearForm()
        }
    }

    return(

        <div className="training-day-page">

            <div className="nav">
                <Link to={'/training/current_program'}>
                    <button className="nav-button shadow">
                        <Icon icon="ic:round-arrow-back-ios" />
                    </button>
                </Link>
            </div>

            <div>
                <h1 className="title">Training plan for {capitalizeFirstLetter(day)}</h1>

                {
                 (Object.keys(user).length !== 0 && user.trainingThemes[day] === '') || themeEditorShow 
                 ?  <TrainingThemeEditor show={setThemeEditorShow} theme={formTrainingTheme} setTheme={setFormTrainingTheme} day={day}/> 
                 :  <div className="training-program-element reversed shadow">
                        <div>
                            <p>Training Theme</p> 
                            <span>{Object.keys(user).length !== 0 ? user.trainingThemes[day] : null}</span> 
                        </div>
                        <div className="right-column">
                            <button onClick={ () => {setFormTrainingTheme(user.trainingThemes[day]); setThemeEditorShow(true)} } className="nav-button m-0">
                                <Icon icon="eva:edit-outline" />
                            </button>
                        </div>
                    </div>
                }

                <TransitionGroup className="exercises-transition-group">
                {filteredExercises.map(exercise => (
                    <CSSTransition key={exercise._id} timeout={300} classNames="exercises-transition">
                    <EditableExercise 
                    name={exercise.exerciseName} 
                    sets={exercise.sets} 
                    reps={exercise.reps} 
                    id={exercise._id} 
                    link={exercise.description}
                    setFormExerciseName={setFormExerciseName}
                    setFormLink={setFormLink}
                    setFormReps={setFormReps}
                    setFormSets={setFormSets}
                    showExerciseEditor={setEditorShow}
                    setFormAction={setFormAction}
                    setFormId={setFormId}/>
                    </CSSTransition>
                ))}
                </TransitionGroup>

                <CSSTransition in={editorShow} timeout={300} classNames="fade-bottom" unmountOnExit>
                    <ExerciseEditor 
                    clearForm={clearForm}
                    handleSubmit={handleSubmit}
                    id={formId} 
                    show={setEditorShow} 
                    exerciseName={formExerciseName} 
                    reps={formReps} 
                    sets={formSets}
                    formLink={formLink}
                    setFormExerciseName={setFormExerciseName}
                    setFormLink={setFormLink}
                    setFormReps={setFormReps}
                    setFormSets={setFormSets}
                    formAction={formAction}/>
                </CSSTransition>
            
                <NewExerciseButton show={setEditorShow} setFormAction={setFormAction} setFormId={setFormId}/>     
               
            </div>

        </div>
    )
}