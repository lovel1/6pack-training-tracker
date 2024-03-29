import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export const TrainingDayCard = ({day, theme}) => (
    <div className="training-program-element training-day shadow">
        <div>
            <p>{day}</p>
            <span>{theme}</span>
        </div>
        <div className="right-column">
            <button className="nav-button mr-1">
                <Icon className="red-close" icon="ci:close-small" />
            </button>

            <Link to={`/training/${day.toLowerCase()}`}> 
                <button className="nav-button m-0">
                    <Icon icon="ic:round-arrow-forward-ios" />
                </button>
            </Link>
            
        </div>
    </div>
)