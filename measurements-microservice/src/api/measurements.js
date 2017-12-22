'use strict'

const status = require('http-status')

module.exports = (app, options) => {
  const {repo} = options

  app.get('/measurements/:userId', (req, res, next) => {
    repo.getMeasurementsByUser(req.params.userId).then(measurements => {
      res.status(status.OK).json(measurements)
    }).catch(next)
  })

  app.post('/measurements', (req, res, next) => {
    repo.insertMeasurement(req.body.type, req.body.value, req.body.ownerId).then(result => {
      res.status(status.OK).json(result)
    }).catch(next)
  })
}
