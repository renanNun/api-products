# API de Produtos

Esta é uma simples API de Produtos, criada utilizando Nodejs com typescript. O Banco de dados utilizado para esta aplicação foi o Postgresql, Redis para armazenamento de Cache e 
Docker para criação de Cache


## Bibliotecas Utilizadas

- [express](https://www.npmjs.com/package/express)
- [typeorm](https://www.npmjs.com/package/typeorm)
- [ioredis](https://www.npmjs.com/package/ioredis)
- [cors](https://www.npmjs.com/package/cors)

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

### Levantando o servidor

<b>Instalando o Projeto com npm:</b>

```
  npm run dev
```
<b>Instalando o Projeto com yarn:</b>

```
yarn dev
```


## To-do

- [x] CRUD de Produtos
- [x] CRUD de Categorias
- [ ] CRUD de usuários
- [ ] CRUD de comentários
- [ ] Upload de Imagens em Produtos
- [ ] Upload de Avatar em usuários
- [ ] Middlewares de autenticação
- [ ] Paginação de Dados
- [ ] Testes Automatizados

### Endpoints

* Categorias

localhost:3000/categories

* Produtos

localhost:3000/products

* Invalidar o Cache

localhost:3000/invalidate-cache