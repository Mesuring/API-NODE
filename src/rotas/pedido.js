const express = require('express');
const pedidoBD = require('../database/pedido');
const pedidoRota = express.Router();



pedidoRota.get('/procurar/:idVenda', async (req, res) => {
    const { idVenda } = req.params
    const pedido = await pedidoBD.vendaById(idVenda)
    if (!pedido)
      res.status(404).json({ erro: 'pedido não encontrado' })
    res.status(200).json(pedido)
})


pedidoRota.get('/acha/:cpf', async (req, res) => {
    let {cpf} = req.params
    const pedido = await pedidoBD.vendaPorID(cpf)
    if (!pedido)
      res.status(404).json({ erro: 'pedido por clientenão encontrado' })
    res.status(200).json(pedido)
})


pedidoRota.post('/incluir',async(req, res) => {
    const {cpfCliente,idProd,qtdComprada,data,cep,numCasa,idFunc} = req.body
    if(!cpfCliente&&!idProd&&!qtdComprada&&!data&&!cep&&!numCasa && !idFunc)
        return res.status(400).json({ erro: 'Insira todos os dados'})
    let comando = false
    comando = await pedidoBD.cadastrar( cpfCliente,idProd,qtdComprada,data,cep,numCasa,idFunc) 
    console.log(comando)
    if(!comando)
        return res.status(501).json({ error: "erro ao cadastrar PEDIDO" })
    res.sendStatus(201)
})


module.exports =pedidoRota