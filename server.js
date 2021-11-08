import express from "express"
import users from "./routes/users.js"
import exercises from "./routes/exercises.js"
import auth from "./routes/auth.js"
import completedTrainings from "./routes/completedTrainings.js"
import cors from "cors"
import path from 'path'

const __dirname = path.resolve()

const app = express()

app.use(cors())

// In order to read JSON (instead of body-parser)
app.use(express.json())

app.use(express.static(path.join(__dirname, "client", "build")))

// Applying routes
app.use("/api/users", users)
app.use("/api/exercises", exercises)
app.use("/api/auth", auth)
app.use("/api/completed_trainings", completedTrainings)

export default app