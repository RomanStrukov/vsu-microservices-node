// Stuff for flats microservice
db = db.getSiblingDB('flats');
db.createCollection('flats')
db.flats.insertMany([{
        square: 120,
        type:   'private',
        address: {
            city:   'Voronezh',
            street: 'Moskovsiy prospekt',
            building: '32A',
            apartment: 14
        },
        owner: null
    }, {
        square: 120,
        type:   'office',
        address: {
            city:   'Voronezh',
            street: 'Volgogradskaya',
            building: '8',
            apartment: 135
        },
        owner: null
    }, {
        square: 120,
        type:   'office',
        address: {
            city:   'Voronezh',
            street: 'Svobody',
            building: '69A',
            apartment: 50
        },
        owner: null
    },
])

// Users
db = db.getSiblingDB('auth');
db.createCollection('users')
db.users.insertMany([{
        email: "zhe3145@yandex.ru",
        name: "Evgeniy",
        surname: "Morozov",
        password: "14881488"
    }, {
        email: "example@example.com",
        name: "Example",
        surname: "User",
        password: "example_user"
    }
])
db.createCollection('tokens')