import { Icon } from "@iconify/react";

export const NewExerciseButton = ({func}) => (
    <div className="add-new-exercise ">
        <button onClick={func} className="nav-button shadow m-0">
            <Icon icon="bi:plus" />
        </button>
    </div>
)