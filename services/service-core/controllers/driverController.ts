import multer from 'multer'
import sharp from 'sharp'
import asyncError from '../utils/asyncError'
import DriverModel from '../models/driverModel'
import { Request, Response, NextFunction } from 'express'
import APIFeatures from '../utils/apiFeatures'
import AppError from '../utils/appError'

const multerStorage = multer.memoryStorage()

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(
      new AppError(
        'Not an image! Please upload only images.',
        400,
      ) as unknown as null,
      false,
    )
  }
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
})

export const uploadUserPhoto = upload.single('photo')

export const resizeUserPhoto = asyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next()

    req.file.filename = `driver-${req.params.id}-${Date.now()}.jpeg`

    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/drivers/${req.file.filename}`)

    next()
  },
)

export const createDriver = asyncError(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const newDriver = await DriverModel.create(req.body)

    res.status(201).json({
      status: 'success',
      data: {
        driver: newDriver,
      },
    })
  },
)

export const getAllDrivers = asyncError(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const features = new APIFeatures(DriverModel.find(), req.query)
      .filter()
      .limitFields()
      .paginate()
      .sort()

    const drivers = await features.query

    const searchString = 'eth'
    const regex = new RegExp(`^${searchString}`, 'i')

    res.status(200).json({
      status: 'success',
      results: drivers.length,
      data: {
        drivers,
      },
    })
  },
)

export const getDriver = asyncError(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const driver = await DriverModel.findById(req.params.id)
      .populate({
        path: 'vehicle',
        select: '-driver -__v',
      })
      .populate({
        path: 'faultRecord',
        select: '-driver -__v',
      })

    res.status(200).json({
      status: 'success',
      data: {
        driver,
      },
    })
  },
)

export const updateDriver = asyncError(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (req.file) req.body.photo = req.file.filename
    console.log(req.file)
    const updateDriver = await DriverModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    )
      .populate({
        path: 'vehicle',
        select: '-driver -__v',
      })
      .populate({
        path: 'faultRecord',
        select: '-driver -__v',
      })

    res.status(200).json({
      status: 'success',
      data: {
        driver: updateDriver,
      },
    })
  },
)
export const deleteDriver = asyncError(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const deleteDriver = await DriverModel.findByIdAndDelete(req.params.id)

    res.status(204).json({
      status: 'success',
      data: null,
    })
  },
)