import { Icon } from "@iconify/react";

export const EditableExercise = ({name, sets, reps}) => (
    <div className="training-program-element shadow">
        <div>
            <p>{name}</p> 
            <span>{sets} sets, {reps} reps</span>
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
)