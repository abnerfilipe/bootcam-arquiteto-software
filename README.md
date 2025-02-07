# E-commerce API

API RESTful para gerenciamento de produtos, clientes e pedidos desenvolvida com Node.js, TypeScript e MongoDB. Desenvolvimento como projeto de finalizacao do Bootcampo de Arquiteto de Software da XP Educaçāo.

## Tecnologias Utilizadas 🛠

- Node.js
- TypeScript 
- Express
- MongoDB/Mongoose
- Swagger/OpenAPI

## Pré-requisitos ⚙️

- Node.js 18+
- MongoDB
- NPM ou Yarn

## Configuração 🔧

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd ecommerce-api
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Crie um arquivo .env na raiz do projeto
- Copie o conteúdo abaixo e ajuste as variáveis:
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=sua-url-do-mongodb
```

## Executando o Projeto 🚀

**Desenvolvimento:**
```bash
npm run dev
```

**Produção:**
```bash
npm run build
npm start
```

## Documentação da API 📚

A documentação completa da API pode ser acessada em:
```
http://localhost:3000
```

## Endpoints da API 🔌

### Produtos 📦

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/produtos` | Lista todos os produtos |
| GET | `/api/produtos/:id` | Busca produto por ID |
| GET | `/api/produtos/busca?nome=` | Busca produtos por nome |
| POST | `/api/produtos` | Cria novo produto |
| PUT | `/api/produtos/:id` | Atualiza produto |
| DELETE | `/api/produtos/:id` | Remove produto |

#### Exemplo de Requisição (Criar Produto)
```json
{
  "name": "Produto Teste",
  "price": 99.99,
  "description": "Descrição do produto",
  "image": "url-da-imagem",
  "sku": "SKU123"
}
```

### Clientes 👥

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/clientes` | Lista todos os clientes |
| GET | `/api/clientes/:id` | Busca cliente por ID |
| GET | `/api/clientes/busca?nome=` | Busca clientes por nome |
| POST | `/api/clientes` | Cria novo cliente |
| PUT | `/api/clientes/:id` | Atualiza cliente |
| DELETE | `/api/clientes/:id` | Remove cliente |

#### Exemplo de Requisição (Criar Cliente)
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "11999999999",
  "address": "Rua Exemplo, 123"
}
```

### Pedidos 🛍️

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/pedidos` | Lista todos os pedidos |
| GET | `/api/pedidos/:id` | Busca pedido por ID |
| GET | `/api/pedidos/cliente?clienteId=` | Busca pedidos por cliente |
| POST | `/api/pedidos` | Cria novo pedido |
| PUT | `/api/pedidos/:id` | Atualiza pedido |
| DELETE | `/api/pedidos/:id` | Remove pedido |

#### Exemplo de Requisição (Criar Pedido)
```json
{
  "clienteId": "id-do-cliente",
  "itens": [
    {
      "produtoId": "id-do-produto",
      "quantidade": 2
    }
  ]
}
```

## Estrutura do Projeto 📁

```
src/
  ├── app.ts              # Configuração do Express
  ├── server.ts           # Entrada da aplicação
  ├── config/             # Configurações (banco de dados, etc)
  ├── controllers/        # Controladores da aplicação
  ├── models/            # Modelos do Mongoose
  ├── repositories/      # Camada de acesso aos dados
  ├── routes/           # Rotas da API
  ├── services/         # Lógica de negócio
  └── utils/            # Utilitários e helpers
```

## Scripts Disponíveis 📜

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Executa em modo desenvolvimento |
| `npm run build` | Compila o TypeScript |
| `npm start` | Executa em produção |

## Respostas da API 📫

Todas as respostas seguem o formato:

```json
{
  "data": {}, 
  "message": "Mensagem de sucesso/erro",
  "statusCode": 200
}
```

## Status dos Pedidos 📊

| Status | Descrição |
|--------|-----------|
| `pendente` | Pedido criado |
| `pago` | Pagamento confirmado |
| `enviado` | Pedido em transporte |
| `entregue` | Entrega concluída |
| `cancelado` | Pedido cancelado |

## Tratamento de Erros ⚠️

A API retorna erros no formato:

```json
{
  "error": "Descrição do erro",
  "message": "Mensagem amigável",
  "statusCode": 400
}
```
