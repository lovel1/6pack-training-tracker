import { Icon } from "@iconify/react";
import { updateTrainingData } from "../../actions/trainingActions";

const changeExerciseState = async (id, action) => {
    const token = JSON.parse(window.localStorage.getItem('loggedUser'))
    await updateTrainingData(token, id, action)
}


export const TodayTrainingCard = ({exercise_name, reps, sets, completed, id}) => (
    <div className="training-program-element shadow">
        <div>
            <p>{exercise_name}</p>
            <span>{reps} reps, {sets} sets</span>
        </div>
        <div className="right-column">

            <button className="nav-button mr-1">
                <Icon icon="bi:question" />
            </button>

            <button onClick={() => changeExerciseState(id, !completed)} className={completed ? 'nav-button completed-exercise' : 'nav-button'}>
                <Icon icon="akar-icons:check"/>
            </button>

        </div>
    </div>
)