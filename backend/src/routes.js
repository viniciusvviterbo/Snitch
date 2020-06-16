const express = require('express');

const DenunciasController = require('./controllers/DenunciasController')

const AnexosController = require('./controllers/AnexosController')

const routes = express.Router();

routes.get('/denuncias', DenunciasController.index);
routes.post('/denuncias', DenunciasController.create);

routes.get('/anexos', AnexosController.index);
routes.post('/anexos', AnexosController.create);
routes.delete('/anexos/:id' , AnexosController.delete)

module.exports = routes;