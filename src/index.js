const express  = require ("express");

const getConnectionDB = require('./database/connection');
const rotaCliente = require('./rotas/cliente');
// const rotaPedido = require('./rotas/pedido');
const log = require('./middleware/log');

const app = express();

app.use(express.json()); 
getConnectionDB();
app.use(log)

app.use('/cliente',rotaCliente);
//app.use('/pedido',rotaPedido);

const port = 3000;


//Comunica que essa vai ser uma rota usavel
app.use('/*', (req, res) => {
  res.status(404).send(`
    <h1>ERROR 404 na API </h1>
    <p>A rota: ${req.originalUrl} com o método: ${req.method} não existe!</p>
  `);
})

app.listen(port, ()=>{
    console.log(`Servidor rodando no endpoint https//localhost:${port}/`)
})