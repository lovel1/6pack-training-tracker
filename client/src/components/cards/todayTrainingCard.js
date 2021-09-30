import { Icon } from "@iconify/react";

export const TodayTrainingCard = ({exercise_name, reps, sets}) => (
    <div className="training-program-element shadow">
        <div>
            <p>{exercise_name}</p>
            <span>{reps} reps, {sets} sets</span>
        </div>
        <div className="right-column">

            <button className="nav-button mr-1">
                <Icon icon="bi:question" />
            </button>

            <button className="nav-button">
                <Icon icon="akar-icons:check" />
            </button>

        </div>
    </div>
)