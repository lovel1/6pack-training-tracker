import axios from "axios"
import { TRAINING_ADD_EXERC, TRAINING_GET_DATA, TRAINING_REMOVE_EXERC } from "../constants/trainingsConstants"
import { store } from "../store"

const baseUrl = 'http://localhost:5000/api'
const dispatch = store.dispatch

export const getTrainingData = async (token) => {
    const newToken = `bearer ${token}`
    const res = await axios.get(`${baseUrl}/completed_trainings`, {
        headers: {
            Authorization: newToken
        }
    })
    if (res.status === 200) {
        dispatch({
            type: TRAINING_GET_DATA,
            payload: res.data
        })
    }
}

export const updateTrainingData = async (token, id, action) => {
    const newToken = `bearer ${token}`
    const res = await axios.put(`${baseUrl}/completed_trainings`, {id, action}, {
        headers: {
            Authorization: newToken
        }
    })
    if (res.status === 200) {
        if (res.data.action) {
            dispatch({
                type: TRAINING_ADD_EXERC,
                payload: res.data.id
            })
        } else {
            dispatch({
                type: TRAINING_REMOVE_EXERC,
                payload: res.data.id
            })
        }
    }
}