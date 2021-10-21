import express from "express"
import decodeToken from '../utils/decodeToken.js'
import CompletedTraining from "../models/CompletedTraining.js"

const router = express.Router()

// @route   GET api/completed_trainings
// @desc    Tries to find information about completed training for current day. In case if it's not found creates it.
router.route('/').get((req, res) => {
  const decodedToken = decodeToken(req)
  if (!decodedToken) { return res.status(402).json({error: "invalid token"}) }
  const date = new Date().toISOString().split('T')[0]

  CompletedTraining.findOne({userId: decodedToken.id, date: date}).then((result) => {
    if (!result) {
      const newTraining = new CompletedTraining({
        userId: decodedToken.id
      })
      newTraining.save()
      .then(() => res.status(200).json(newTraining))
      .catch((err) => res.json(err))
    } else {
      res.status(200).json(result)
    }
  })
  .catch((err) => res.json(err))

})

// @route   PUT api/completed_trainings
// @desc    Adds/Removes an exercise from Completed Training Object of Current Day
router.route('/').put(async (req, res) => {
  const decodedToken = decodeToken(req)
  if (!decodedToken) { return res.status(402).json({error: "invalid token"}) }
  const date = new Date().toISOString().split('T')[0]
  const id = req.body.id
  const action = req.body.action ? '$push' : '$pull'

  CompletedTraining.updateOne({ userId: decodedToken.id, date: date }, { [action]: { completedExercises: id } })
  .then(() => res.status(200).json({id, action: req.body.action}))
  .catch((err) => res.status(402).json(err))
  
})

export default router

