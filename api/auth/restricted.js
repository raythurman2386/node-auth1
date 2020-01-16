const restricted = () => {
  const authError = {
    message: 'Invalid Credentials'
  }

  return async (req, res, next) => {
    try {
      if (req.session && req.session.user) {
        next();
      } else {
        return res.status(401).json(authError);
      }
    } catch (error) {
      next(error)
    }
  }
}

export default restricted;