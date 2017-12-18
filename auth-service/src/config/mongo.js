const MongoClient = require('mongodb')

// here we create the url connection string that the driver needs
const getMongoURL = (options) => {
  const url = options.servers
    .reduce((prev, cur) => prev + `${cur},`, 'mongodb://')
  return `${url.substr(0, url.length - 1)}/${options.db}`
}

// mongoDB function to connect, open and authenticate
const connect = (options, mediator) => {
  console.log(getMongoURL(options))
  mediator.once('boot.ready', () => {
    MongoClient.connect(getMongoURL(options), {
      db: options.dbParameters(),
      server: options.serverParameters()
    }, (err, db) => {
      if (err) {
        mediator.emit('db.error', err)
      }
      mediator.emit('db.ready', db.db(options.db))
    })
  })
}

module.exports = Object.assign({}, {connect})
