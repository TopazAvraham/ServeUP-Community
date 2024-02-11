import { createUser,updateUserInfo} from '../controllers/userController.js';
import express from 'express';

const router = express.Router();

router.post('/', createUser);
router.patch('/', updateUserInfo); 

export default router;
