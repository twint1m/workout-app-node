import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'

// @desc    Get workouts
// @route   GET /api/workouts
// @access  Private
export const getWorkouts = asyncHandler(async (req, res) => {
	const workouts = await prisma.workout.findMany({
		orderBy: {
			id: 'desc'
		},
		include: {
			exercises: true
		}
	})
	res.json(workouts)
})

// @desc    Get workouts
// @route   GET /api/workouts/:id
// @access  Private
// FIXME: Workout not found! while trying to get workout by :id key
export const getWorkout = asyncHandler(async (req, res) => {
	try {
		const workout = await prisma.workout.findFirst({
			where: { id: +req.params.id },
			include: {
				exercises: true
			}
		})

		const minutes = Math.ceil(workout.exercises.length * 3.7)

		res.json({ ...workout, minutes })
	} catch {
		res.status(404)
		throw new Error(`Workout nod found!`)
	}
})

// @desc    Create new workout
// @route 	POST /api/workouts
// @access  Private
export const createNewWorkout = asyncHandler(async (req, res) => {
	const { name, exerciseIds } = req.body

	const workout = await prisma.workout.create({
		data: {
			name,
			exercises: {
				connect: exerciseIds.map(id => ({ id: +id }))
			}
		}
	})

	res.json(workout)
})

// @desc    Update workouts
// @route   PUT /api/workouts/:id
// @access  Private
export const updateWorkout = asyncHandler(async (req, res) => {
	const { name, exerciseIds } = req.body

	try {
		const workout = await prisma.workout.update({
			where: {
				id: +req.params.id
			},
			data: {
				name,
				exercises: {
					set: exerciseIds.map(id => ({ id: +id }))
				}
			}
		})

		res.json(workout)
	} catch (error) {
		res.status(404)
		throw new Error('Workout not found!')
	}
})

// @desc    Delete workout
// @route   DELETE /api/workouts/:id
// @access  Private
export const deleteWorkout = asyncHandler(async (req, res) => {
	try {
		const workout = await prisma.workout.delete({
			where: {
				id: +req.params.id
			}
		})
		res.json({ message: 'Workout deleted!' })
	} catch (error) {
		res.status(404)
		throw new Error('Workout not found!')
	}
})
