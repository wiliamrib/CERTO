# Certo Donations API

Este projeto é uma API para gerenciar doações no site do CERTO — Centro de Excelência em Reabilitação. A API permite que os usuários façam doações, salvando informações como nome do doador (com opção de anonimato) e CPF. Além disso, a API oferece funcionalidades para listar e remover doações.

## Estrutura do Projeto

```
certo-donations-api
├── src
│   ├── index.js                # Ponto de entrada da aplicação
│   ├── config
│   │   └── db.js              # Configuração do banco de dados MongoDB
│   ├── controllers
│   │   └── donationController.js # Controlador para gerenciar doações
│   ├── models
│   │   └── donation.model.js   # Modelo de doação usando Mongoose
│   ├── routes
│   │   └── donationRoutes.js   # Rotas para doações
│   ├── services
│   │   └── donationService.js   # Lógica de negócios para doações
│   ├── middlewares
│   │   └── errorHandler.js      # Middleware para tratamento de erros
│   └── utils
│       └── validator.js         # Funções utilitárias de validação
├── tests
│   └── donation.test.js         # Testes unitários para doações
├── .env.example                  # Exemplo de configuração de variáveis de ambiente
├── .gitignore                    # Arquivos a serem ignorados pelo Git
├── package.json                  # Configuração do npm
└── README.md                     # Documentação do projeto
```

## Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/seu-usuario/certo-donations-api.git
   ```

2. Navegue até o diretório do projeto:
   ```
   cd certo-donations-api
   ```

3. Instale as dependências:
   ```
   npm install
   ```

4. Configure as variáveis de ambiente:
   - Renomeie o arquivo `.env.example` para `.env` e adicione a URL de conexão do MongoDB Atlas.

## Uso

1. Inicie o servidor:
   ```
   npm start
   ```

2. A API estará disponível em `http://localhost:3000`.

## Endpoints

- `POST /donations` - Criar uma nova doação.
- `GET /donations` - Listar todas as doações.
- `DELETE /donations/:id` - Remover uma doação pelo ID.

## Testes

Para executar os testes, utilize o comando:
```
npm test
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença

Este projeto está licenciado sob a MIT License.
