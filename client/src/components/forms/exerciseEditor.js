import { Icon } from "@iconify/react";
import react from "react";

export const ExerciseEditor = ({func}) => {
    return (
        <div className="exercise-input-container shadow">

            <div className="close-container">
                <button onClick={func}>
                    <Icon icon="ci:close-small" />
                </button>
            </div>

            <form>
                <div className="input-field-container">
                    <label>Exercise name</label>
                    <input></input>
                </div>
                <div className="input-field-container">
                    <label>Link to video</label>
                    <input></input>
                </div>

                <div className="exercise-input-row">
                    <div className="exercise-input-row-element">
                        <input maxLength="3" className="square-input"></input>
                        <label>Sets</label>
                    </div>

                    <div className="exercise-input-row-element">
                        <input maxLength="3" className="square-input"></input>
                        <label>Repeats</label>
                    </div>
                </div>
                <button className="btn-black-roundend">
                    <Icon icon="akar-icons:check" />
                </button>
            </form>
        </div>
    )
}