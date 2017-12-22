'use strict'

const repository = (db) => {
  console.log(db.collection)
  const usersCollection = db.collection('users')
  const authCollection = db.collection('tokens')

  const disconnect = () => {
    db.close()
  }

  const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
      const projection = {}

      const sendUser = (err, user) => {
        if (err) {
          reject(new Error(`An error occured fetching a user with email: ${email}, err: ${err}`))
        }
        resolve(user)
      }

      usersCollection.findOne({email: email}, projection, sendUser)
    })
  }

  const getAllUsers = () => {
    return new Promise((resolve, reject) => {
      const users = []
      const cursor = usersCollection.find({}, {})

      const addUser = (user) => {
        users.push(user)
      }

      const sendUsers = (err) => {
        if (err) {
          reject(new Error(`An error occured fetching all users, err: ${err})`))
        }
        resolve(users.slice())
      }
      cursor.forEach(addUser, sendUsers)
    })
  }

  const getUserById = (id) => {
    return new Promise((resolve, reject) => {
      const projection = {}

      const sendUser = (err, user) => {
        if (err) {
          reject(new Error(`An error occured fetching a user with id: ${id}, err: ${err}`))
        }
        resolve(user)
      }

      usersCollection.findOne({_id: id}, projection, sendUser)
    })
  }

  const getUserByToken = (token) => {
    return new Promise((resolve, reject) => {
      const projection = {_id: 0, user_id: 1}

      const sendUserID = (err, userID) => {
        if (err) {
          reject(new Error(`An error occured fetching a userID for token: ${token}, err: ${err}`))
        }
        resolve(userID)
      }

      authCollection.findOne({token: token}, projection, sendUserID)
    }).then((userObj) => { return getUserById(userObj.user_id) })
  }

  const insertUser = (user) => {
    // TODO: verify object or change function arguments
    return new Promise((resolve, reject) => {
      const sendResult = (err, res) => {
        if (err) {
          reject(new Error(`An error occured inserting user to db: ${res}, err: ${err}`))
        }
        resolve(res)
      }
      console.log('Inserting a user')
      usersCollection.insertOne(user, sendResult)
    })
  }

  const insertUserToken = (token, userID, validThrough) => {
    return new Promise((resolve, reject) => {
      const tokenObj = Object.create({
        token: token,
        userID: userID,
        validThrough: validThrough
      })

      const sendResult = (err, res) => {
        if (err) {
          reject(new Error(`An error occured inserting access token to db: ${res}, err: ${err}`))
        }
        resolve(res)
      }

      usersCollection.insertOne(tokenObj, sendResult)
    })
  }

  return Object.create({
    getUserByEmail,
    getAllUsers,
    getUserById,
    getUserByToken,

    insertUser,
    insertUserToken,

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
