import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma.js'
import { UserFields } from '../utils/user.utils.js'

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id
		},
		select: UserFields
	})

	res.json(user)
})

// FIXME: delete on production, /all route too
// @desc    Get all users
// @route   GET /api/users/all
// @access  Private
export const getAllUsers = asyncHandler(async (req, res) => {
	const user = await prisma.user.findMany()
	res.json(user)
})
