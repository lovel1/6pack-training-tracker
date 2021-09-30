import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';

export const DashboardMenuButton = ({link, icon, label}) => (
    <div className="dashboard-menu-wrapper">
        <Link to={link}>
            <button className="dashboard-menu-btn shadow">
                <Icon icon={icon}/>
                <p>{label}</p>
            </button>
        </Link>
    </div>
)