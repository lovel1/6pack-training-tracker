import { combineReducers, createStore, applyMiddleware } from 'redux'
import { userReducer } from './reducers/userReducer'
import thunk from 'redux-thunk'
import { exercisesReducer } from './reducers/exercisesReducer'
import { trainingReducer } from './reducers/trainingReducer'

const initState = {
    user: {},
    exercises: [],
    training: {}
}

const reducer = combineReducers({
    user: userReducer,
    exercises: exercisesReducer,
    training: trainingReducer
})

export const store = createStore(
    reducer,
    initState,
    applyMiddleware(thunk)
)

