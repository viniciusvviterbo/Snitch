//npm install sqlite3
const sqlite3 = require("sqlite3").verbose()

// criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./database.db")

module.exports = db

db.serialize(() => {
    // 1)criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS denuncias(
            idDenuncias INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            localizacao TEXT,
            data DATETIME
        );    
    `)
    db.run(`
        CREATE TABLE IF NOT EXISTS anexos(
            idAnexos INTEGER PRIMARY KEY AUTOINCREMENT,
            anexo BLOB ,
            id_Denuncias INTEGER,
            CONSTRAINT fk_denuncias
                FOREIGN KEY (id_Denuncias)
                REFERENCES denuncias(idDenuncias)
                ON DELETE RESTRICT
        );
    `)

    //2) Inserir dados na tabela
    const query =`
        INSERT INTO denuncias(
            nome,
            localizacao,
            data
        ) VALUES(?,?,?)
    `
    const values = [
        "Evento ",
        "Rua 3,Ressaca,Contagem-MG,31360-310,Brasil",
        "2020-10-10 12:00:00"
    ]
    function afterInsertData(err){
        if (err){
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
    }
    db.run(query,values,afterInsertData)

    // 3) Consultar dados da tabela
    db.all(`SELECT * FROM denuncias`, function(err,rows){
        if(err){
            return console.log(err)
        }

        console.log("Aqui estão os registros")
        console.log(rows)
    })

    //4) Deletar dados da tabela
    // db.run(`DELETE FROM denuncias WHERE idDenuncias = ?`, [1], function(err,rows){
    //     if (err){
    //         return console.log(err)
    //     }
    //     console.log(`Registro deletado com sucesso!`)
    // })
})
