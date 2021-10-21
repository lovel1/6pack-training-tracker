import express from "express"
import Exercise from "../models/Exercise.js"
import User from "../models/User.js"
import jwt from 'jsonwebtoken'
import decodeToken from '../utils/decodeToken.js'

const router = express.Router()

// @route   GET api/exercises/all
// @desc    Get All Exercises of Current User
router.route('/all').get((req, res) => {
  const decodedToken = decodeToken(req)
  if (!decodedToken) { return res.status(402).json({error: "invalid token"}) }

  Exercise.find({'userId': decodedToken.id})
      .then(result => res.status(200).json(result))
})

// @route   GET api/exercises
// @desc    Get All Exercises of Current User for Specific Day
router.route('/').get((req, res) => {
    const decodedToken = decodeToken(req)
    if (!decodedToken) { return res.status(402).json({error: "invalid token"}) }

    Exercise.find({'userId': decodedToken.id, 'day': req.query.day})
        .then(result => res.status(200).json(result))
})

// @route   POST api/exercises
// @desc    Create New Exercise for Current User
router.route('/').post(async (req, res) => {
    const decodedToken = decodeToken(req)
    if (!decodedToken) { return res.status(402).json({error: "invalid token"}) }

    const newExercise = new Exercise({
        userId: decodedToken.id,
        day: req.body.day,
        exerciseName: req.body.exerciseName,
        sets: req.body.sets,
        reps: req.body.reps,
        description: req.body.description
    })

    newExercise.save()
      .then(() => {
        res.status(200).json(newExercise._id)
      })
      .catch((err) => res.json('Unable to add an exercise'))
})

// @route   GET api/exercises:id
// @desc    Get an Exercise
router.route('/:id').get((req, res) => {

  Exercise.findById(req.body.id)
      .then(result => res.json(result))
})

// @route   PUT api/exercises
// @desc    Update an Exercise
router.route('/').put((req, res) => {

  Exercise.findByIdAndUpdate(req.body._id,
      {
        "day": req.body.day,
        "exerciseName": req.body.exerciseName,
        "reps": req.body.reps,
        "sets": req.body.sets,
        "description": req.body.description
      }
    )
    .then(result => res.status(200).json(result))
    .catch(err => res.status(402))
})

// @route   DELETE api/exercises/:id
// @desc    Delete an Exercise
router.route('/').delete((req, res) => {
  Exercise.findByIdAndDelete(req.query.id)
    .then(result => res.status(200).json({success: true}))
    .catch(err => res.status(402).json({success: false}))
})

export default router

