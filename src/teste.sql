select * from pra.verificaLogin

Select * from pra.verificaLogin where senha = 'Senha321' and Email = 'ManuelafSil@gmail.com'


insert into pra.Cliente values('98712399999','Felipe','C','Silva','FcSilva@gmail.com','98765432',31,'1987-12-08','Senha123')

select CPF_Cliente from pra.Cliente
select * from pra.Pedido
select * from pra.Produto
select * from pra.Funcionario


exec pra.incluirProduto 3,'Rosa',500,'cheirosa',null,'Rosa','32'

exec pra.fazerPedido '12345678900',3,1,'2023-12-08','12345678',123,'123'



{
  "CPF_Cliente": "99999999999",
  "firNome": "Ademir",
  "meioNome": "C",
  "ultNome": "Silva",
  "Email": "AcSilva@gmail.com",
  "CEP": "98765432",
  "numCasa": 31,
  "Aniversario": "1987-12-06T00:00:00.000Z",
  "senha": "Senha123"
}


