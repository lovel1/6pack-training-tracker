import axios from "axios"
import { EXERC_ADD, EXERC_DELETE, EXERC_EDIT } from "../constants/exercisesConstants"
import { store } from "../store"

const baseUrl = '/api'
const dispatch = store.dispatch

export const addExercise = async (token, data) => {

    // Formatting received token into a string starting from 'bearer '
    const newToken = `bearer ${token}`

    // Assigning server response to a variable
    const res = await axios.post(`${baseUrl}/exercises`, data, {
        headers: {
            Authorization: newToken
        }
    })
    if (res.status === 200) {
        dispatch({
            type: EXERC_ADD,
            payload: {...data, _id: res.data}
        })
    }
}

export const editExercise = async data => {
    const res = await axios.put(`${baseUrl}/exercises`, data)
    if (res.status === 200) {
        dispatch({
            type: EXERC_EDIT,
            payload: data
        })
    }
}

export const deleteExercise = async id => {
    const res = await axios.delete(`${baseUrl}/exercises`, { params: {id} } )
    if (res.status === 200) {
        dispatch({
            type: EXERC_DELETE,
            payload: id
        })
    }
}

