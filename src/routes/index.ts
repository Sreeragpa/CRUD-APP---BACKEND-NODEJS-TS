import express from 'express';
import UserController from '../controllers/UserController';
import { adminAuthmiddleware, authMiddleware } from '../middlewares/AuthMiddleware';


const router = express.Router()



router.get('/users',adminAuthmiddleware,UserController.getAllUsers);
router.get('/user',authMiddleware,UserController.getUser);
router.post('/user',UserController.createUser);
router.put('/user/:id',UserController.updateUser);
router.delete('/user/:id',UserController.deleteUser);
router.post('/user/login',UserController.login);
router.post('/admin/login',UserController.adminlogin);
router.post('/user/uploadprofile',authMiddleware,UserController.updateUserProfile)
router.get('/user/uploadprofile',authMiddleware,UserController.updateUserProfile)

  

export default router;