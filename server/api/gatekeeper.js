const isAdminMiddleware = (req, res, next) => {
  const currentUser = req.user
  if (currentUser && currentUser.isAdmin) {
    next()
  } else {
    const error = new Error('Access denied!')
    error.status = 401
    next(error)
  }
}

const isUserMiddleware = (req, res, next) => {
  const currentUserId = req.user.id
  if (currentUserId === Number(req.params.userId)) {
    next()
  } else {
    const error = new Error('You do not have access to this cart!')
    error.status = 401
    next(error)
  }
}

module.exports = {
  isAdminMiddleware,
  isUserMiddleware
}
