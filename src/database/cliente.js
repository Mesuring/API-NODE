const connection = require('./connection')

module.exports = {
    selectClientes:async()=>{
        try{
            const resultado = await connection().query('Select * from pra.Cliente')
            return resultado.recordset
        }
        catch(error){
            console.log('Erro ao selecionar clientes: '+error)
        }
    },
    selecionarPorId:async (cpf) =>{
        try{
            const resultado = await connection().query(`Select * from pra.Cliente where CPF_Cliente = '${cpf}'`)
            return resultado.recordset[0]
        }
        catch(error){
            console.log('Erro ao selecionar cliente pelo CPF: '+error)
        }
    },
    cadastrar:async(cpfCliente,firNome,meioNome,ultNome,Email,cep,numCasa,aniversario,senha)=>{
        try{
            let respos = await connection().query(`exec pra.incluirCliente ${cpfCliente},${firNome},${meioNome},${ultNome},${Email},${cep},${numCasa},${aniversario},${senha}`)
            return true
        }
        catch(erro){
            console.log("Error no cadastro do Cliente: "+erro.code)
            return false
        }
    },
    aniversarioClienteHoje: async()=>{
        try{
            const resultado = await connection().query('Select * from pra.aniversarioClienteHoje')
            return resultado.recordset
        }
        catch(error){
            console.log('Erro ao selecionar aniversários dos clientes: '+error)
        }
    }
    
}