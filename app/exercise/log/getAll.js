import expressAsyncHandler from 'express-async-handler'

import { prisma } from '../../prisma.js'

export const getAll = expressAsyncHandler(async (req, res) => {
	const getAll = await prisma.exerciseLog.findMany()
	res.json(getAll)
})
