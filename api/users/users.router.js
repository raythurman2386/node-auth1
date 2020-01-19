import express from 'express';
import bcrypt from 'bcryptjs';
import restricted from '../auth/restricted';
import usersModel from '../users/users.models';

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
      const { username, password } = req.body;
      const user = await usersModel.findBy({ username }).first();
      const checkPassword = await bcrypt.compare(password, user.password);

      if (user && checkPassword) {
        req.session.user = user;
        return res.status(200).json({ message: `Welcome ${username}!` })
      } else {
        return res.status(401).json({ message: 'Invalid Credentials' })
      }
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

  .get('/logout', async (req, res, next) => {
    try {
      if (req.session) {
        req.session.destroy(err => {
          if (err) {
            return res.json({ message: 'We had an issue logging you out' })
          } else {
            return res.status(201).json({ message: 'Logout Successful' })
          }
        })
      } else {
        return res.status(200).json({ message: 'You have logged out' })
      }
    } catch (error) {
      next(error)
    }
  })

export default router;