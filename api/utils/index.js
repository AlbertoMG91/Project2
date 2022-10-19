const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

async function checkAuth (req, res, next) {
  if (!req.headers.token) return res.status(401).send('User not logged in')

  jwt.verify(req.headers.token, process.env.SECRET, async (err, decoded) => {
    if (err) return res.status(401).send('Token not valid')
    const user = await User.findOne({ where: {email: decoded.email} })
    
    if (!user) return res.status(401).send('Token not valid')
    else {
      res.locals.user = user
    }
    next()
  })
}

function checkRole (req, res, next) {
  res.locals.user.role !== 'admin' ? res.status(401).send('User not authorized') : next()
}

module.exports = { 
  checkAuth,
  checkRole
}