import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
const router = express.Router()

// @route    POST api/auth/login
// @desc     Login
router.route('/login').post(async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    const passwordCorrect = user === null 
    ? false 
    : await bcrypt.compare(req.body.password, user.password)

    if (!user) {
      return res.status(401).json({success: false, message: 'Invalid email'})
    }

    if (!passwordCorrect) {
      return res.status(401).json({success: false, message: 'Invalid password'})
    }

    const userForToken = {
      email: user.email,
      id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    res.status(200).send({ token, userData: user })
});

// @route    POST api/auth/verify
// @desc     Verification of auth-token
router.route('/verify').get(async (req, res) => {
  const token = req.get('authorization')
  try {
    const verifiedToken = jwt.verify(token, process.env.SECRET)
    return res.status(200).send()
  } catch (err) {
    return res.status(401).send()
  }
});


export default router
