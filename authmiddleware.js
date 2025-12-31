const jwt = require('jsonwebtoken')

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Authentication invalid' })
  }
  const token = authHeader.split(' ')[1]
  console.log(authHeader)
  console.log(token)

  try {
    const { username, userId } = jwt.verify(token, 'secret')
    req.user = { username, userId }
    next()
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Authentication invalid' })
  }
}

module.exports = authMiddleware