import { EXERC_ADD, EXERC_CLEAR_SESSION, EXERC_DELETE, EXERC_EDIT, EXERC_GET_DATA } from "../constants/exercisesConstants"


export const exercisesReducer = (state = [], action) => {
    switch (action.type) {
      case EXERC_GET_DATA:
        return action.payload
      case EXERC_CLEAR_SESSION:
        return []
      case EXERC_ADD:
        return [...state, action.payload]
      case EXERC_EDIT:
        const elementToUpdate = state.findIndex(exercise => exercise._id === action.payload._id)
        state[elementToUpdate] = action.payload
        return state
      case EXERC_DELETE:
        return state.filter(exercise => exercise._id !== action.payload)
      default:
        return state
    }
}