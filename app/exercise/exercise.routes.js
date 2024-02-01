import express from 'express'

import { protect } from '../middleware/auth.middleware.js'

import {
	createNewExercise,
	deleteExercise,
	getExercises,
	updateExercises
} from './exercise.controller.js'
import { createNewExerciseLog } from './log/exercise-log.controller.js'
import { getExerciseLog } from './log/get-exercise-log.controller.js'
import { getAll } from './log/getAll.js'

const router = express.Router()

router.route('/').post(protect, createNewExercise).get(protect, getExercises)
router
	.route('/:id')
	.put(protect, updateExercises)
	.delete(protect, deleteExercise)

router
	.route('/log/:exerciseId')
	.post(protect, createNewExerciseLog)
	.get(protect, getExerciseLog)
router.route('/log').get(getAll)

export default router
