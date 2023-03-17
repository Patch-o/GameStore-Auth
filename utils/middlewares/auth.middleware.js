const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    return res.status(401).json('not authorized, need to login')
}


module.exports = {
    isAuthenticated,
}