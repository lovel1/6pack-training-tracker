import { Icon } from "@iconify/react";

export const NewExerciseButton = ({show, setFormAction, setFormId}) => (
    <div className="add-new-exercise ">
        <button className="nav-button shadow m-0" onClick={() => {show(true); setFormAction('add'); setFormId('')} }>
            <Icon icon="bi:plus" />
        </button>
    </div>
)