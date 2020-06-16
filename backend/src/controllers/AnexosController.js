const connection = require("../database/connection");

module.exports = {
    async index (request, response){
        const anexos = await connection('incidents').select('*');

        return response.json(anexos)
    },

    async createReadStream(request,response) {
        const { title, description} = request.body;
        const denuncias_id = request.headers.authorization;

        const [id] = await connection('denuncias').insert({
            title,
            description,
            value,
            denuncias_id,
        });

        return response.json({ id }); 
    },

    async delete(request,response) {
        const { id } = request.params;
        const denuncias_id = request.headers.authorization;

        const anexos = await connection('denuncias')
            .where('id', id)
            .select('denuncias_id')
            .first();

            if(anexos.denuncias_id != denuncias_id) {
                return response.status(401).json ({error: 'Operation not permitted. '})
            }

            await connection('anexo').where('id',id).delete();

            return response.status(204).send();
    }
};