
exports.up = function(knex) {
    return knex.schema.createTable('denuncias', function(table){
        table.increments("id_denuncias");
        table.text('nome').notNullable();
        table.text('localizacao').notNullable();
        table.date('data').notNullable();
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('denuncias');
};
