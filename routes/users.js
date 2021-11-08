import express from "express"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import User from "../models/User.js"
const router = express.Router()
import decodeToken from '../utils/decodeToken.js'

// @route   GET api/users
// @desc    Get Current User's Data
router.route('/').get((req, res) => {
  const decodedToken = decodeToken(req)
  if (!decodedToken) { return res.status(402).json({success: false, message: "Unable to verify user's token"}) }

  const userId = decodedToken.id
    User.findById(userId)
        .then(result => res.status(200).json(result))
        .catch(err => res.json({success: false, message: 'Unable to find user in the database'}))
})

// @route   POST api/users
// @desc    Create New User
router.route('/').post(async (req, res) => {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds)
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: passwordHash
    })

    newUser.save()
      .then(() => {
        const userForToken = {
          email: newUser.email,
          id: newUser._id
        }
        const token = jwt.sign(userForToken, process.env.SECRET)
        res.status(200).send({ token, userData: newUser })
      })
      .catch((err) => {
        res.status(500).json({success: false, message: 'Email is already used'})
      })
})

// @route   DELETE api/users/:id
// @desc    Delete User
router.route('/:id').delete((req, res) => {
    User.findById(req.params.id)
        .then(result => result.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}))
})

// @route   GET api/users/training_theme
// @desc    Get Traning Theme of Specific Day
router.route('/training_theme').get((req, res) => {
  const decodedToken = decodeToken(req)
  if (!decodedToken) { return res.status(402).json({success: false, message: "Unable to verify user's token"}) }

  const userId = decodedToken.id
  const trainingThemePath = 'trainingThemes.' + req.query.day

  User.findById(userId, {[trainingThemePath]: 1, _id: 0})
      .then(result => res.json(result))
      .catch(err => res.status(402).json({success: false}))
})

// @route   PUT api/users/training_theme
// @desc    Update Traning Theme of Current Day
router.route('/training_theme').put((req, res) => {
  const decodedToken = decodeToken(req)
  if (!decodedToken) { return res.status(402).json({success: false, message: "Unable to verify user's token"}) }

  const userId = decodedToken.id
  const trainingThemePath = 'trainingThemes.' + req.body.day

  User.findByIdAndUpdate(userId, {[trainingThemePath]: req.body.trainingTheme})
      .then(result => res.status(200).json(result))
      .catch(err => res.status(402).json({success: false, message: 'Unable to get training theme'}))
})


export default router