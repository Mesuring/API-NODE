const connection = require('./connection')
const jwt = require("jsonwebtoken");
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
            let respos = await connection().query(`insert into pra.Cliente values('${cpfCliente}','${firNome}','${meioNome}','${ultNome}','${Email}','${cep}',${numCasa},'${aniversario}','${senha}')`)
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
    },
    deletarCliente:async(cpf)=>{
    try {
        const result = await connection().query(`exec pra.excluirCliente '${cpf}'`)
        return true
        }
        catch(err) {
            console.log('Erro ao deletar cliente:'+err)
            return false
        }
    },
    alterarSenha:async(cpfCliente,senha)=>{
        try{
            let respos = await connection().query(`UPDATE pra.Cliente SET senha = ${senha} where CPF_Cliente =${cpfCliente}`)
            return respos.recordset
        }
        catch(erro){
            console.log("Error na atualização da Senha: "+erro.code)
            return false
        }
    },
    fazLogin:async(email,senha)=>{
        try{
            let resp = await connection().query(`Select * from pra.verificaLogin where senha ='${senha}' and Email = '${email}' `)
            return true
        }
        catch(erro){
            console.log("Erro ao Logar:  "+erro.code)
            return false
        }
    },
    verificaLogin: async(token,secret)=>{
        let ret
        jwt.verify(token,secret,(err)=>{
            if(err) 
                ret = false
            ret= true
        })
        return ret
    }
}