import express from 'express'

import { protect } from '../middleware/auth.middleware.js'

import { getAllUsers, getUserProfile } from './user.controller.js'

const router = express.Router()

router.route('/profile').get(protect, getUserProfile)
router.route('/all').get(protect, getAllUsers)

export default router
