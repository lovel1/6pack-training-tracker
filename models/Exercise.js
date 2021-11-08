import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ExerciseSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    exerciseName: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    sets: {
        type: Number,
        required: true
    },
    description: {
        type: String
    }
})


export default mongoose.model('exercise', ExerciseSchema)