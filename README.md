# API de Produtos

Esta é uma simples API de Produtos, criada utilizando Nodejs com typescript. O Banco de dados utilizado para esta aplicação foi o Postgresql, Redis para armazenamento de Cache e 
Docker para criação de Cache


## Bibliotecas Utilizadas

- [express](https://www.npmjs.com/package/express)
- [typeorm](https://www.npmjs.com/package/typeorm)
- [ioredis](https://www.npmjs.com/package/ioredis)
- [cors](https://www.npmjs.com/package/cors)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [class-transformer](https://www.npmjs.com/package/class-transformer)
- [typeorm-seeding](https://www.npmjs.com/package/typeorm-seeding)

## Utilizando o Projeto

### Instação

Criando a imagem do docker pela primeira vez

```
    docker-compose up -d
```

<b>Instalando o Projeto com npm:</b>

```
    npm install
```
<b>Instalando o Projeto com yarn:</b>

```
    yarn install
```

### Migrações

#### Criando as Tabelas

<b>Utilizando o npm:</b>

```
    npm run typeorm migration:run
```
<b>Utilizando o yarn:</b>

```
    yarn typeorm migration:run
```

#### Revertendo as migrações

<b>Utilizando o npm:</b>

```
    npm run typeorm migration:revert
```
<b>Utilizando o yarn:</b>

```
    yarn typeorm migration:revert
```

### Rodando Seeder da API

<b>Utilizando o npm:</b>

```
    npm run seed
```
<b>Utilizando o yarn:</b>

```
    yarn seed
```

### Levantando o servidor

<b>Utilizando o npm:</b>

```
    npm run dev
```
<b>Utilizando o yarn:</b>

```
    yarn dev
```


## To-do

- [x] CRUD de Produtos
- [x] CRUD de Categorias
- [x] CRUD de usuários
- [ ] CRUD de comentários
- [ ] Upload de Imagens em Produtos
- [ ] Upload de Avatar em usuários
- [ ] Recuperação de Email e Senha
- [x] Middlewares de autenticação
- [x] Paginação de Dados
- [x] Testes Automatizados para usuários

### Endpoints

* Categorias

localhost:3000/categories

* Produtos

localhost:3000/products

* Usuários

localhost:3000/users

* Autenticação

localhost:3000/auth

* Recuperação de Senha

localhost:3000/password/reset

* Invalidar o Cache

localhost:3000/invalidate-cache