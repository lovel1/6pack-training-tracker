import { Icon } from "@iconify/react";

export const ExerciseEditor = ({clearForm, id, show, exerciseName, reps, sets, formLink, formAction, setFormExerciseName, setFormLink, setFormReps, setFormSets, handleSubmit}) => {

    return (
        <div className="exercise-editor-container">
        <div className="exercise-editor input-container shadow">
            <div className="close-container">
                <button onClick={ () => {show(false); clearForm()} }>
                    <Icon icon="ci:close-small" />
                </button>
            </div>
            <form onSubmit={handleSubmit} autoComplete="off">
                <input hidden name="action" value={formAction} readOnly></input>
                <input hidden name="id" value={id} readOnly></input>
                <div className="input-field-container">
                    <label>Exercise name</label>
                    <input value={exerciseName} name="exerciseName" onChange={( {target} ) => setFormExerciseName(target.value)}></input>
                </div>
                <div className="input-field-container">
                    <label>Link to video</label>
                    <input value={formLink} name="description" onChange={( {target} ) => setFormLink(target.value)}></input>
                </div>

                <div className="input-row">
                    <div className="input-row-element">
                        <input maxLength="3" className="square-input" value={sets} name="sets" onChange={( {target} ) => setFormSets(target.value)}></input>
                        <label>Sets</label>
                    </div>

                    <div className="input-row-element">
                        <input maxLength="3" className="square-input" value={reps} name="reps" onChange={( {target} ) => setFormReps(target.value)}></input>
                        <label>Repeats</label>
                    </div>
                </div>
                <button className="btn-black-roundend submit-btn" type="submit">
                    <Icon icon="akar-icons:check" />
                </button>
            </form>
        </div>
        </div>
    )
}