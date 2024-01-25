import { prisma } from '../prisma.js'
import expressAsyncHandler from 'express-async-handler'
import { hash } from 'argon2'
import { generateToken } from './generateToken.js'
import { userFields } from '../utils/user.utils.js'
import verify from 'argon2'

// @desc Auth user
// @route POST /api/auth/auth
// @access Public
export const authUser = expressAsyncHandler(async (req, res) => {
	const user = prisma.user.findMany()
	res.json(user)
})

// @desc Register user
// @route POST /api/auth/register
// @access Public
export const registerUser = expressAsyncHandler(async (req, res) => {
	const { email, password, name } = req.body

	const isHaveUser = await prisma.user.findUnique({
		where: {
			email: email
		}
	})

	if (isHaveUser) {
		res.status(400)
		throw new Error('User is already exists')
	}

	const user = await prisma.user.create({
		data: {
			email,
			password: await hash(password),
			name
		},
		select: userFields
	})

	const token = generateToken()

	res.json({ user, token })
})

export const loginUser = expressAsyncHandler(async (req, res) => {
	const { email, password, name } = req.body

	const isUserExist = await prisma.user.findUnique({
		where: {
			email: email
		}
	})
})

const isValidPassword = await verify(user.password, password)

if (user && isValidPassword) {
	const token = generateToken()
	res.json({ user, token })
} else {
	res.status(401)
	throw new Error('Email or password are not correct!')
}
