import app from "./server.js"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const port = process.env.PORT || 5000
const db = process.env.DB_6PACK_URI

mongoose.connect(db)
.then(() => console.log('DB connected'))
.catch(err => console.log(err))

app.listen(port, () => console.log(`Server started on port ${port}`))