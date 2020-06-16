
exports.up = function(knex) {
    return knex.schema.createTable('anexos', function(table){
        table.increments("id_anexos");
        table.blob('anexo');
       
        table.int('denuncias_id').notNullable();

        table.foreign('denuncias_id').references('id_denuncias').inTable('denuncias')
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('anexos');
};
