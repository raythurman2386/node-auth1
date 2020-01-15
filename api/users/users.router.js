import express from 'express';
import restricted from '../auth/restricted';
import usersModel from '../users/users.models';
import dbConfig from '../../data/db-config';

const router = express.Router();

router
  // Regiser
  .post('/register', async (req, res, next) => {
    try {
      const user = await usersModel.add(req.body);
      return res.status(201).json(user);
    } catch (error) {
      next(error)
    }
  })

  // Login
  .post('/login', async (req, res, next) => {
    try {

    } catch (error) {
      next(error)
    }
  })

  // Get users
  .get('/users', restricted(), async (req, res, next) => {
    try {
      const users = await usersModel.find();
      return res.status(200).json(users);
    } catch (error) {
      next(error)
    }
  })

export default router;