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

    if (!(user && passwordCorrect)) {
      return res.status(401).json({error: 'Invalid username or password'})
    }

    const userForToken = {
      email: user.email,
      id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    res.status(200).send({ token, userData: user })
});

// @route    POST api/auth/verify
// @desc     Login
router.route('/verify').get(async (req, res) => {
  const token = req.get('authorization')
  try {
    const verifiedToken = jwt.verify(token, process.env.SECRET)
    return res.status(200).send()
  } catch (err) {
    console.log(err)
    return res.status(401).send()
  }
});


export default router
