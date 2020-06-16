const express = require("express")
const routes = require("./routes")
const app = express();

app.use(express.json());
app.use(routes);
// querys : parametros nomeados enviados na rota após ? (filtros, paginação)
// query params: paremtros utilizados para identificar recursos
// request body :corpo  da requisição



app.listen(3333);