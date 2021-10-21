import express from "express"
import users from "./routes/users.js"
import exercises from "./routes/exercises.js"
import auth from "./routes/auth.js"
import completedTrainings from "./routes/completedTrainings.js"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json()) //For reading JSON (instead of body-parser)

app.use("/api/users", users)
app.use("/api/exercises", exercises)
app.use("/api/auth", auth)
app.use("/api/completed_trainings", completedTrainings)

export default app