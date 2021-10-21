import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from 'dayjs'
import { Icon } from '@iconify/react';
import {TodayOverview} from '../components/cards/TodayOverview'
import {DashboardMenuButton} from '../components/buttons/dashboardMenuButton'
import {getUser} from "../services/user"
import {getTrainingTheme} from "../services/exercises"
import { useSelector } from "react-redux";
import { logout } from "../actions/userActions";



export const Dashboard = () => {
    const user = useSelector((state) => state.user)
    const date = new Date().toISOString()
    const day = dayjs(date).format('dddd').toLowerCase()

    return (
        <div className="dashboard-page">

        <div className="nav-dashboard">
            <Link to="/sign_in">
                <button className="nav-button shadow">
                    <Icon icon="bi:person" />
                </button>
            </Link>
                <button onClick={() => logout()} className="nav-button shadow">
                    <Icon icon="fe:logout"/>
                </button>
        </div>

        <div className="dashboard-congrats">
            <h1><span>Hi,</span> {user.username}</h1>
            <h2>It's {dayjs(date).format('D MMM YYYY, ddd')}</h2>
        </div>

        <TodayOverview theme={user.trainingThemes[day]}/>

        <div className="dashboard-menu-row">
            <DashboardMenuButton link={'/training/current_program'} icon={'map:gym'} label={'Program'}/>
            <DashboardMenuButton link={'/statistics'} icon={'gridicons:stats-alt-2'} label={'Statistics'}/>
            <DashboardMenuButton link={'/settings'} icon={'carbon:settings'} label={'Settings'}/>
        </div>

        </div>
    )
}