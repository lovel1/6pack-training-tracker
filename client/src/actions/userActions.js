import axios from "axios"
import { useHistory } from "react-router"
import { EXERC_CLEAR_SESSION, EXERC_GET_DATA } from "../constants/exercisesConstants"
import { USER_GET_DATA, USER_LOGIN, USER_LOGIN_FAIL, USER_LOGOUT, THEME_EDIT } from "../constants/userConstants"
import { TRAINING_GET_DATA } from "../constants/trainingsConstants"
import { store } from "../store"

const baseUrl = '/api'
const dispatch = store.dispatch

export const verifyToken = async (token, func) => {      
    if (token) {
        const res = await axios.get(`${baseUrl}/auth/verify`, {
            headers: {
                Authorization: token
            }
        })

        const tokenVerified = res.status === 200 ? true : false

        func(tokenVerified)
    }

    return false
}

export const signUp = async credentials => {
    try {
        const res = await axios.post(`${baseUrl}/users`, credentials)
        window.localStorage.setItem('loggedUser', JSON.stringify(res.data.token)) 
        const token = JSON.parse(window.localStorage.getItem('loggedUser')) 
        const newToken = `bearer ${token}`
        const resExercises = await axios.get(`${baseUrl}/exercises/all`, {
            headers: {
                Authorization: newToken
            }
        })
        const resTraining = await axios.get(`${baseUrl}/completed_trainings`, {
            headers: {
                Authorization: newToken
            }
        })

        dispatch({
            type: USER_LOGIN,
            payload: res.data.userData
        })
        dispatch({
            type: EXERC_GET_DATA,
            payload: resExercises.data
        })
        dispatch({
            type: TRAINING_GET_DATA,
            payload: resTraining.data
        })
        return {success: true}
    } catch (err) {
        return {success: false, message: err.response.data.message}
    }
  }

export const login = async credentials => {       
    try {
        const res = await axios.post(`${baseUrl}/auth/login`, credentials)
        window.localStorage.setItem('loggedUser', JSON.stringify(res.data.token)) 
        const token = JSON.parse(window.localStorage.getItem('loggedUser')) 
        const newToken = `bearer ${token}`
        const resExercises = await axios.get(`${baseUrl}/exercises/all`, {
            headers: {
                Authorization: newToken
            }
        })
        const resTraining = await axios.get(`${baseUrl}/completed_trainings`, {
            headers: {
                Authorization: newToken
            }
        })

        dispatch({
            type: USER_LOGIN,
            payload: res.data.userData
        })   
        dispatch({
            type: EXERC_GET_DATA,
            payload: resExercises.data
        })
        dispatch({
            type: TRAINING_GET_DATA,
            payload: resTraining.data
        })

        return {success: true}
    } catch (err) {
        return {success: false, message: err.response.data.message}
    }
}

export const logout = async () => {      
    window.localStorage.removeItem('loggedUser')

    dispatch({
        type: USER_LOGOUT
    })
    dispatch({
        type: EXERC_CLEAR_SESSION
    })
}

export const setInitData = async (token) => {    
    if (token) {
        const newToken = `bearer ${token}`
        const resUser = await axios.get(`${baseUrl}/users`, {
            headers: {
                Authorization: newToken
            }
        })
        const resExercises = await axios.get(`${baseUrl}/exercises/all`, {
            headers: {
                Authorization: newToken
            }
        })
        const resTraining = await axios.get(`${baseUrl}/completed_trainings`, {
            headers: {
                Authorization: newToken
            }
        })


        if (resUser.data && resExercises.data && resTraining.data) {
            const data = {
                userData: resUser.data,
                exercisesData: resExercises.data,
                trainingData: resTraining.data
            }
            
            dispatch({
                type: USER_GET_DATA,
                payload: data.userData
            })
            dispatch({
                type: EXERC_GET_DATA,
                payload: data.exercisesData
            })
            dispatch({
                type: TRAINING_GET_DATA,
                payload: data.trainingData
            })   
        } else {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: {error: "error setInitData"}
            })
        }
    }
}

export const editTrainingTheme = async (token, theme, day) => {
    const newToken = `bearer ${token}`
    const res = await axios.put(`${baseUrl}/users/training_theme`, {trainingTheme: theme, day: day}, {
        headers: {
            Authorization: newToken
        }
    })
    if (res.status === 200) {
        dispatch({
            type: THEME_EDIT,
            payload: {theme, day}
        })
    }
}


