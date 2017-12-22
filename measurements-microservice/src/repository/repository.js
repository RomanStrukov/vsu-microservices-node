'use strict'

const ObjectID = require('mongodb').ObjectID

const repository = (db) => {
  console.log(db.collection)
  const measurementsCollection = db.collection('measurements')

  const disconnect = () => {
    db.close()
  }

  const getMeasurementsByUser = (userId) => {
    return new Promise((resolve, reject) => {
      const measurements = []
      const cursor = measurementsCollection.find({ownerId: ObjectID(userId)}, {})

      const addMeasurement = (user) => {
        measurements.push(user)
      }

      const sendMeasurements = (err) => {
        if (err) {
          reject(new Error(`An error occured fetching measurements for id: ${userId}, err: ${err}`))
        }
        resolve(measurements.slice())
      }
      cursor.forEach(addMeasurement, sendMeasurements)
    })
  }

  const insertMeasurement = (type, value, userId) => {
    return new Promise((resolve, reject) => {
      const sendResult = (err, res) => {
        if (err) {
          reject(new Error(`An error occured inserting measurement to db: ${res}, err: ${err}`))
        }
        resolve(res)
      }
      const measurement = {
        type: type,
        value: value,
        createdAt: new Date(),
        ownerId: ObjectID.createFromHexString(userId)
      }
      measurementsCollection.insertOne(measurement, sendResult)
    })
  }

  return Object.create({
    getMeasurementsByUser,
    insertMeasurement,

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
