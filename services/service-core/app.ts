import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import * as path from 'path'
import cookieParser from 'cookie-parser'

import driverRouter from './routes/driverRoutes'
import trainingRouter from './routes/trainingRoutes'
import errorHandler from './middleware/errorMiddleware'
import adminRoute from './routes/adminRoutes'
import faultRecordRouter from './routes/faultRecordRoutes'
import vehicleRouter from './routes/vehicleRoutes'
import vehicleAccidentRouter from './routes/vehicleAccidentRoutes'
import AppError from './utils/appError'

const app = express()

app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api/admins', adminRoute)
app.use('/api/drivers', driverRouter)
app.use('/api/trainings', trainingRouter)
app.use('/api/faultrecords', faultRecordRouter)
app.use('/api/vehicleaccidents', vehicleAccidentRouter)
app.use('/api/vehicles', vehicleRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(errorHandler)

export default app
