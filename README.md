FinApi - Financeia

Requisitos
[x] Deve ser possível criar umma conta

<!-- /**
 * dados para gerar de uma conta
 * cpf:string;
 * name:string;
 * id: uuid;
 * statement(são os extratos da conta): []
 */ -->

[x] Deve ser possível buscar o extrato bancário do cliente
[x] Deve ser possível realizar um depósito
[x] Deve ser possível realizar um saque
[x] Deve ser possível buscar o extrato bancário do cliente por data
[x] Deve ser possível atualizar dados da conta do cliente
[x] Deve ser possível obter dados da conta do cliente
[] Deve ser possível deletar uma conta

Regras de negócio
[x] Não deve ser possível cadastrar uma conta com CPF já existente
[x] Não deve ser possível fazer depósito em uma conta não existente
[x] Não deve ser possível buscar extrato em uma conta não existente
[x] Não deve ser possível fazer saque em uma conta não existente
[] Não deve ser possível excluir uma conta não existente
[x] Não deve ser possível fazer saque quando o saldo for insuficiente