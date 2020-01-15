import bcrypt from 'bcryptjs';
import usersModel from '../users/users.models';

const restricted = () => {
  const authError = {
    message: 'Invalid Credentials'
  }

  return async (req, res, next) => {
    try {
      const { username, password } = req.headers;
      if (!username || !password) {
        return res.status(401).json(authError);
      }

      const user = await usersModel.findBy({ username }).first();
      if (!user) {
        return res.status(401).json(authError)
      }

      const checkPass = await bcrypt.compare(password, user.password)
      if (!checkPass) {
        return res.status(401).json(authError)
      }

      next();
    } catch (error) {
      next(error)
    }
  }
}

export default restricted;