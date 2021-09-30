import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export const EmptyTrainingDayCard = ({day}) => (
    <div className="training-program-element empty-day shadow">
        <div>
            <p>{day}</p> 
            <span>No training</span>
        </div>
        <div className="right-column">
            <Link to={`/training/${day.toLowerCase()}`}> 
                <button className="nav-button m-0">
                    <Icon icon="bi:plus" />
                </button>
            </Link>
        </div>
    </div>
)