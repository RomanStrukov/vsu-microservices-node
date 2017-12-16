'use strict'

const repository = (db) => {
  const collection = db.collection('flats')

  const getAllFlats = () => {
    return new Promise((resolve, reject) => {
      const flats = []
      const cursor = collection.find({}, {id: 1})

      const addFlat = (flat) => {
        flats.push(flat)
      }

      const sendFlats = (err) => {
        if (err) {
          reject(new Error(`An error occured fetching all flats, err:' + err)`))
        }
        resolve(flats.slice())
      }
      cursor.forEach(addFlat, sendFlats)
    })
  }

  const getFlatById = (id) => {
    return new Promise((resolve, reject) => {
      const projection = {_id: 0, id: 1}

      const sendFlat = (err, flat) => {
        if (err) {
          reject(new Error(`An error occured fetching a flat with id: ${id}, err: ${err}`))
        }
        resolve(flat)
      }

      collection.findOne({id: id}, projection, sendFlat)
    })
  }

  const disconnect = () => {
    db.close()
  }

  return Object.create({
    getFlatById,
    getAllFlats,
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
