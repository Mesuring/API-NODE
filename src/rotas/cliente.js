const express = require('express');
const clienteDB = require('../database/cliente');
const clienteRota = express.Router();


clienteRota.get('/procurar',async(req,res)=>{
    res.status(200).json(await clienteDB.selectClientes())
}),

clienteRota.get('/procurar/:cpf', async(req,res)=>{
    let {cpf} = req.params
    let dadosCliente = await clienteDB.selecionarPorId(cpf);
    if(!dadosCliente)
        res.status(404).json({erro:'Cliente não encontrado'})
    res.status(200).json(dadosCliente)
}),

clienteRota.put('/alter',async(req,res)=>{
    const { cpf } = req.params
    const { senha } = req.body
    if(!cpf && !senha)
        return res.status(400).json({ erro: 'Insira todos os dados'})
    if(cpf.length !=11)
        return res.status(400).json({ erro: 'O CPF deve ter OBRIGATÓRIAMENTE 11 números' })
    if(senha.length>20)
        return res.status(400).json({erro:'Senha maior que o permitido'})
    const cliente = await clienteDB.selecionarPorId(cpf)
    if(!cliente)
        return res.status(404).json({ error: "cliente não encontrado" })
    if(!await clienteDB.alterarSenha(cpf,senha))
        return res.status(401).json({ error: "Error na atualização da Senha" })
    return res.status(200).json({ message: "Senha atualizada com sucesso!" })
}),

clienteRota.post('/cadastro',async(req,res)=>{
    const {cpfCliente,firNome,meioNome,ultNome,Email,cep,numCasa,aniversario,senha} = req.body

    if(!cpfCliente&&!firNome&&!meioNome&&!ultNome&&!Email&&!cep&&!numCasa&&!aniversario && !senha)
        return res.status(400).json({ erro: 'Insira todos os dados'})


    if(!await clienteDB.cadastrar( cpfCliente,firNome,meioNome,ultNome,Email,cep,numCasa,aniversario,senha))
        return res.status(501).json({ error: "erro ao cadastrar cliente" })
    res.sendStatus(201)

}),

clienteRota.get('/aniversario',async(req,res)=>{
    res.status(200).json(await clienteDB.aniversarioClienteHoje())
}),

clienteRota.delete('/deletar:cpf',async(req,res)=>{
    let { cpf } = req.params
    if(cpf.length != 11)
        return res.status(400).json({ erro: 'O CPF deve ter OBRIGATÓRIAMENTE 11 números' })

    if(!await clienteDB.selecionarPorId(cpf))
        return res.status(404).json({ error: "cliente não encontrado" })

    if(!await clienteDB.deletarCliente(cpf))
        return res.status(401).json({ error: "erro ao deletar cliente" })
    return res.status(200).json({ message: "cliente deletado com sucesso" })
}),



module.exports =clienteRota