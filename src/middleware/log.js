module.exports = (req, res, next) => {
    console.time(`[${req.method}] - ${req.originalUrl} (${req.ip})`)
    next()
    console.timeEnd(`[${req.method}] - ${req.originalUrl} (${req.ip})`)
  }