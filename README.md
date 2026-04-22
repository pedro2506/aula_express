# aula_express

## Descrição

Projeto de exemplo em Node.js com Express para gerenciar usuários em memória. Contém rotas para listar, criar e atualizar usuários (fake DB em memória) e scripts para testes automatizados.

## Pré-requisitos

- Node.js >= 18
- npm (vem com Node.js)

## Instalação

1. Clone o repositório:

```bash
git clone <repo-url>
cd aula_express
```

2. Instale dependências:

```bash
npm install
```

## Rodando o projeto

Inicie o servidor em modo normal:

```bash
npm start
```

Por padrão o servidor usa a porta `1234`. Para mudar a porta temporariamente use (Linux/macOS):

```bash
PORT=3000 npm start
```

No PowerShell (Windows):

```powershell
$env:PORT=3000; npm start
```

Se a porta estiver em uso, finalize o processo que a ocupa ou escolha outra porta (veja 'Solução de problemas').

## Endpoints (API)

- GET `/` — health-check simples (retorna texto `Servidor OK`).
- GET `/users` — retorna a lista de usuários (JSON).
- POST `/users` — cria um usuário. Body JSON exemplo:

```json
{
	"id": 2,
	"name": "Nome",
	"email": "email@mail.com"
}
```

- PUT `/users/:id` — atualiza o usuário com `id` numérico. Atualiza apenas os campos presentes no body. Exemplos:

Atualizar apenas o nome:

```bash
curl -X PUT http://localhost:1234/users/1 -H "Content-Type: application/json" -d '{"name":"Novo Nome"}'
```

Atualizar nome e email:

```bash
curl -X PUT http://localhost:1234/users/1 -H "Content-Type: application/json" -d '{"name":"Novo Nome","email":"novo@mail.com"}'
```

Respostas e códigos de status:

- `200` — OK (retorna usuário atualizado ou lista)
- `201` — Criado (em POST)
- `400` — Requisição inválida (ex.: id não numérico)
- `404` — Usuário não encontrado

## Testes automatizados

Incluí um script que inicia o servidor, executa um `PUT` e um `GET` e encerra o processo.

```bash
npm test
```

Esse script usa `scripts/test-users.js` e serve para validar rapidamente o fluxo de atualização de usuário.

## Notas de desenvolvimento

- Os dados estão armazenados em memória (variável `fakeUsers`). Ao reiniciar o servidor os dados voltam ao estado inicial.
- A rota `PUT /users/:id` valida que `id` seja numérico e atualiza apenas os campos enviados no corpo da requisição.
- Arquivos principais:
	- [server.js](server.js) — entrypoint que registra rotas e inicia o servidor.
	- [src/routes/UserRoutes.js](src/routes/UserRoutes.js) — define as rotas.
	- [src/controllers/User.js](src/controllers/User.js) — lógica de list/create/update.

## Solução de problemas

- Porta em uso (Windows):

```powershell
netstat -ano | findstr :1234
taskkill /PID <PID> /F
```

- No Linux/macOS use `lsof -i :1234` e `kill`.

## Contribuição

Pull requests são bem-vindos. Para alterações maiores, abra uma issue primeiro descrevendo a mudança proposta.

## Licença

Ver [LICENSE](LICENSE) para detalhes.


## Run

Start the server with:

```bash
npm start
```

Then open in your browser:

- `http://localhost:1234/` (health check)
- `http://localhost:1234/users` (list users)

If the port 1234 is already in use, stop the process using it or change the port in `server.js`.