import { Link } from "react-router-dom"

export const TodayOverview = ({theme}) => {

    return (
        <div className="dashboard-today shadow">

            <div className="dashboard-today-wrapper">

                <h2>Training for today</h2>

                <div className="dashboard-today-row">

                    <div className="dashboard-today-row-left">
                        <span>{theme ? theme : 'No training'}</span>
                    </div>

                    <div className="dashboard-today-row-right">
                        <p>0</p>
                        <span>Exercises Left</span>
                    </div>

                </div>

                {theme ? <Link to="/training/today">
                    <button className="btn-black-roundend">
                        Open program
                    </button>
                </Link> : null}

            </div>

        </div>
    )
}