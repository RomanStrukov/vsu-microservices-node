'use strict'

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const measurementsAPI = require('../api/measurements')

const start = (options) => {
  return new Promise((resolve, reject) => {
    if (!options.repo) {
      reject(new Error('The server must be started with a connected repository'))
    }
    if (!options.port) {
      reject(new Error('The server must be started with an available port'))
    }

    const app = express()
    app.use(morgan('dev'))
    app.use(bodyParser.json())
    app.use(helmet())
    app.use((err, req, res, next) => {
      reject(new Error('Something went wrong!, err:' + err))
      res.status(500).send('Something went wrong!')
    })

    // we add our API's to the express app
    measurementsAPI(app, options)

    // finally we start the server, and return the newly created server
    const server = app.listen(options.port, () => resolve(server))
  })
}

module.exports = Object.assign({}, { start })
