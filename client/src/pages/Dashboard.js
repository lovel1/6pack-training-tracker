import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user/userContext";
import dayjs from 'dayjs'
import { Icon } from '@iconify/react';
import {TodayOverview} from '../components/cards/TodayOverview'
import {DashboardMenuButton} from '../components/buttons/dashboardMenuButton'

export const Dashboard = () => {

    const { user, date } = useContext(UserContext)

    return (
        <>

        <div className="nav-dashboard">
            <Link to="/account">
                <button className="nav-button shadow">
                    <Icon icon="bi:person" />
                </button>
            </Link>
            {/* <Link > */}
                <button className="nav-button shadow">
                    <Icon icon="fe:logout"/>
                </button>
            {/* </Link> */}
        </div>

        <div className="dashboard-congrats">
            <h1><span>Hi,</span> {user.username}</h1>
            <h2>It's {dayjs(date).format('D MMM YYYY, ddd')}</h2>
        </div>

        <TodayOverview theme={user.plan.find(planElem => planElem.day.toLowerCase() === dayjs(date).format('dddd').toLowerCase()).training_theme}/>

        <div className="dashboard-menu-row">
            <DashboardMenuButton link={'/training/current_program'} icon={'map:gym'} label={'Program'}/>
            <DashboardMenuButton link={'/statistics'} icon={'gridicons:stats-alt-2'} label={'Statistics'}/>
            <DashboardMenuButton link={'/settings'} icon={'carbon:settings'} label={'Settings'}/>
        </div>

        </>
    )
}