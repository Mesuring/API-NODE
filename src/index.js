const express  = require ("express");

const rotaCliente = require('./rotas/cliente');
const rotaPedido = require('./rotas/pedido');



const app = express();

app.use(express.json()); 
app.use((req, res, next) => {
      console.time(`${req.method} - ${req.originalUrl}`)
    next()
    console.timeEnd(`${req.method} - ${req.originalUrl}`)
})

app.use('/cliente',rotaCliente);
app.use('/pedido',rotaPedido);

const port = 3001;


//Comunica que essa vai ser uma rota usavel
app.use('/*', (req, res) => {
  res.status(404).send(`
    <h1>ERROR 404 na API </h1>
    <p>A rota: ${req.originalUrl} com o método: ${req.method} não existe!</p>
  `);
})

app.listen(port, ()=>{
    console.log(`Servidor rodando no endpoint http://localhost:${port}/`)
})