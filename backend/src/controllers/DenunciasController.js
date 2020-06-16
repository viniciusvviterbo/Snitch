const crypto = require('crypto')
const connection = require('../database/connection');

module.exports = {

    async index( request, response) {
        const denuncias = await connection('denuncias').select('*');
    
        return response.json(denuncias);
    },
    async create(request, response) {
        const { nome, localizacao, data} = request.body;

        await connection('denuncias').insert({
            nome,
            localizacao,
            data
        })

        return response.json();
    }
};