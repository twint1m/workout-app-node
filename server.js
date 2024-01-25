import express from 'express'
import 'colors'
import authRoutes from './app/auth/auth.routes.js'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { prisma } from './app/prisma.js'
import { errorHandler, notFound } from './app/middleware/error.middleware.js'

dotenv.config()
const app = express()

async function main() {
	if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

	app.use(express.json())
	app.use('/api/auth', authRoutes)

	app.use(notFound)
	app.use(errorHandler)

	const PORT = process.env.PORT || 5050

	app.listen(
		PORT,
		console.log(
			`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
				.bgGreen.bold
		)
	)
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)``
		prisma.$disconnect
		process.exit(1)
	})
