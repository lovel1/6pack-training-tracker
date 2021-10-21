import { USER_LOGIN, USER_LOGIN_FAIL, USER_LOGOUT, USER_GET_DATA, USER_REGISTER, USER_REGISTER_FAIL, THEME_EDIT } from "../constants/userConstants"


export const userReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_LOGIN:
        return action.payload
      case USER_LOGIN_FAIL:
        return { loading: false, error: action.payload }
      case USER_LOGOUT:
        return {}
      case USER_GET_DATA:
        return action.payload
      case THEME_EDIT:
        state['trainingThemes'][action.payload.day] = action.payload.theme
        return state
      default:
        return state
    }
}