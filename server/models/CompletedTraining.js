import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CompletedTrainingSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: new Date().toISOString().split('T')[0]
    },
    completedExercises: {
        type: Array,
        default: []
    }
})


export default mongoose.model('completedTraining', CompletedTrainingSchema)