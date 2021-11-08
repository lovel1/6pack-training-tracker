import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    trainingThemes: {
        monday: {type: String, default: ''},
        tuesday: {type: String, default: ''},
        wednesday: {type: String, default: ''},
        thursday: {type: String, default: ''},
        friday: {type: String, default: ''},
        saturday: {type: String, default: ''},
        sunday: {type: String, default: ''}
    }
})


export default mongoose.model('user', UserSchema)