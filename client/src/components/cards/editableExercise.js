import { Icon } from "@iconify/react";
import { deleteExercise } from "../../actions/exercisesActions";

export const EditableExercise = ({id, name, sets, reps, link, setFormExerciseName, setFormLink, setFormReps, setFormSets, showExerciseEditor, setFormAction, setFormId}) => {

    const dataToForm = () => {
        setFormId(id)
        setFormExerciseName(name)
        setFormLink(link)
        setFormReps(reps)
        setFormSets(sets)
        setFormAction('edit')
        showExerciseEditor(true)
    }

    const handleDelete = async id => {
        await deleteExercise(id)
    }

    return (
        <div className="training-program-element shadow">
            <div>
                <p>{name}</p> 
                <span>{sets} sets, {reps} reps</span><br/>
                {link && <a className="link" href={link} target="_blank" rel="noreferrer">Link</a>}
            </div>
            <div className="right-column">
                <button onClick={() => handleDelete(id)} className="nav-button mr-1">
                    <Icon className="red-close" icon="ci:close-small" />
                </button>

                <button onClick={() => dataToForm()} className="nav-button">
                    <Icon icon="eva:edit-outline" />
                </button>
            </div>
        </div>
    )
}