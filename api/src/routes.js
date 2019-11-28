const express = require('express')

const UserController = require('./controllers/UserController')

const routes = express.Router()

routes.post('/users', UserController.store )
routes.put('/users', UserController.update )
routes.get('/users', UserController.index )
routes.delete('/users', UserController.delete )
routes.get('/users/edit', UserController.show )

module.exports = routes