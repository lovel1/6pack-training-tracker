import React, { useState } from "react"
// import axios from 'axios'
import { UserContext } from './userContext'

export const UserState = ({children}) => {
    const [user, setUser] = useState({
        id: 1,
        username: 'Maksim',
        email: 'qwertapbru@gmail.com',
        password: 'asdasd',
        plan: [
          {
            id: 1,
            day: 'Monday',
            training_theme: 'Training Theme',
            exercises: [
              {
                exercise_name: 'Deadlift',
                sets: 3,
                reps: 10,
                video: 'http:/link_somewhere'
              }
            ]
          },
          { 
            id: 2,
            day: 'Tuesday',
            training_theme: 'Training Theme 2',
            exercises: [
              {
                exercise_name: 'Deadlift',
                sets: 3,
                reps: 10,
                video: 'http:/link_somewhere'
              }
            ]
          },
          { 
            id: 3,
            day: 'Wednesday',
            training_theme: '',
            exercises: []
          },
          {
            id: 4,
            day: 'Thursday',
            training_theme: 'Training Theme 3',
            exercises: [
              {
                exercise_name: 'Deadlift',
                sets: 3,
                reps: 10,
                video: 'http:/link_somewhere'
              }
            ]
          },
          {
            id: 5,
            day: 'Friday',
            training_theme: '',
            exercises: []
          },
          {
            id: 6,
            day: 'Saturday',
            training_theme: '',
            exercises: []
          },
          {
            id: 7,
            day: 'Sunday',
            training_theme: '',
            exercises: []
          },
        ]
      })

      const date = new Date().toISOString()

    return (
        <UserContext.Provider value={ {user, setUser, date} }>
            {children}
        </UserContext.Provider>
    )
}