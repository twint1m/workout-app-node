import expressAsyncHandler from 'express-async-handler'

import { prisma } from '../../prisma.js'

// @desc    get exercise log by :exerciseId key
// @route   GET /api/exercises/log/:id
// @access  Private

export const getExerciseLog = expressAsyncHandler(async (req, res) => {
	const { id } = req.params

	const exerciseLog = await prisma.exerciseLog.findUnique({
		where: {
			id: +id
		},
		include: {
			exercise: true
		}
	})

	if (!exerciseLog) {
		res.status(404)
		throw new Error('Exercise log not found!')
	}

	const prevLog = await prisma.exerciseLog.findFirst({
		where: {
			id: { lt: exerciseLog.id },
			userId: +req.userId
		},
		orderBy: {
			id: 'desc'
		}
	})

	res.json({ exerciseLog, prevLog })
})

// res.json(+req.params.id)
