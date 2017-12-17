'use strict'
const status = require('http-status')

module.exports = (app, options) => {
  const {repo} = options

  // here we get all the flats
  app.get('/flats', (req, res, next) => {
    repo.getAllFlats().then(flats => {
      res.status(status.OK).json(flats)
    }).catch(next)
  })

  // here we get a flat by id
  app.get('/flats/:id', (req, res, next) => {
    repo.getFlatById(req.params.id).then(flat => {
      res.status(status.OK).json(flat)
    }).catch(next)
  })
}
