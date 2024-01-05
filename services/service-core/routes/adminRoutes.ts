import express from 'express'
import {
  signup,
  signin,
  protect,
  restrictTo,
  verification,
  logout,
  updatePassword,
  forgotPassword,
  resetPassword,
} from '../middleware/authMiddleware'
import {
  deleteUser,
  getUser,
  getAllUsers,
  updateUser,
  uploadUserPhoto,
  resizeUserPhoto,
} from '../controllers/adminController'
const adminRoute = express.Router()

adminRoute.post('/signup', signup)
adminRoute.post('/signin', signin)
adminRoute.get('/verify/:token', verification)
adminRoute.get('/logout', logout)
adminRoute.patch('/updatemypassword', protect, updatePassword)
adminRoute.post('/forgetpassword', forgotPassword)
adminRoute.patch('/resetpassword/:token', resetPassword)

adminRoute.route('/').all(protect, restrictTo('owner')).get(getAllUsers)
adminRoute
  .route('/uploadphoto')
  .patch(protect, uploadUserPhoto, resizeUserPhoto, updateUser)

adminRoute
  .route('/:id')
  .all(protect)
  .get(getUser)
  .patch(restrictTo('owner'), updateUser)
  .delete(restrictTo('owner'), deleteUser)

export default adminRoute