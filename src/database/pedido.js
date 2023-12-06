const connection = require('./connection')

module.exports = {
    vendaById: async(idVenda)=>{
        try{
            const resultado = await connection().query(`Select * from pra.Pedido where idVenda = '${idVenda}'`)
            return resultado.recordset[0]
        }
        catch(error){
            console.log('Erro ao selecionar venda por ID: '+error)
        }
    },
    vendaPorID: async(cpf)=>{
        try{
            const resultado = await connection().query(`Select * from pra.Pedido where CPF_Cliente = '${cpf}'`)
            return resultado.recordset[0]
        }
        catch(error){
            console.log('Erro ao selecionar venda pelo CPF: '+error)
        }
    },
    cadastrar:async(cpfCliente,idProd,qtdComprada,data,cep,numCasa,idFunc)=>{
        try{
            let respos = await connection().query(`exec pra.fazerPedido ${cpfCliente},${idProd},${qtdComprada},${data},${cep},${numCasa},${idFunc}`)
            return true
        }
        catch(erro){
            console.log("Error na Efetivação da venda: "+erro.code)
            return false
        }
    }
}