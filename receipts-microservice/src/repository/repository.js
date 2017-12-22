'use strict'

const ObjectID = require('mongodb').ObjectID

const repository = (db) => {
  console.log(db.collection)
  const measurementsCollection = db.collection('receipts')

  const disconnect = () => {
    db.close()
  }

  return Object.create({
    disconnect
  })
}

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('No connection to database'))
    }
    resolve(repository(connection))
  })
}

module.exports = Object.assign({}, {connect})
