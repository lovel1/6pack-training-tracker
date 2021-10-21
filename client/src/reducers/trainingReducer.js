import { TRAINING_ADD_EXERC, TRAINING_GET_DATA, TRAINING_REMOVE_EXERC } from "../constants/trainingsConstants"


export const trainingReducer = (state = {}, action) => {
    switch (action.type) {
      case TRAINING_GET_DATA:
        return action.payload
      case TRAINING_ADD_EXERC:
        return {
          ...state, completedExercises: [
            ...state.completedExercises, action.payload
          ]
        }
      case TRAINING_REMOVE_EXERC:
        return {
          ...state, completedExercises: state.completedExercises.filter(exercise => exercise !== action.payload)
        }
      default:
        return state
    }
}