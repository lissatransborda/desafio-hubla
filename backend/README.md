# Backend of the challenge

## Responsabilities

Backend responsibilities in this project are:

- Communication with the database, ensuring the stability of the single source of truth
- File upload
- Record of transactions and creators/affiliates
- Send transaction and creator/affiliate list (with balance)

## Technologies

- NestJS ^10.0
- Typescript ^10.9.1
- Prima ^5.4.2
- Jest ^29.5.0

The project is architected in a "Controller Service Repository" model, separating responsibilities following SOLID principles.

## Setup

### Docker

First, build the project preferably with [Docker BuildX](https://docs.docker.com/engine/reference/commandline/buildx/).

```
docker buildx build --tag backend-challange-hubla .
```

If you can't use Docker BuildX, use the traditional build command.

```
docker build --tag backend-challange-hubla .
```

And run with a PostgreSQL database URL.

```
docker run -i -p 3000:3000 --env DATABASE_URL="[URL]" backend-challange-hubla
```

### NPM

You can also start with NPM:

> Default

```
npm run start
```

> Development

```
npm run start:dev
```

Development mode will only enable hot reload.

## Testing

> Unit tests

```
npm run test
```

> Unit tests (coverage)

```
npm run test:cov
```

> E2E Tests

```
npm run test:e2e
```

## Entities

### Seller

Seller represents a seller, which can be a creator or affiliate. The purpose of this entity is to keep a record of each seller's transactions, and calculate their current balance.

#### Properties

- `id` - The unique identifier of each seller. According to the information given in `sales.txt`, it is the name.
- `balance` - Current balance of the seller. This data is updated with each transaction involving the seller.
- `transactions` - A list representing the list of transactions involving the seller. This list is updated with each insertion of transactions involving this seller.

### Transaction

Transaction represents a creator/affiliate's transaction. This entity depends directly on the existence of the seller involving the transaction. All data is taken from the file `sales.txt`.

### Properties

- `id` – The unique identifier of each transaction. It's a random ID in uuid4.
- `type` - Transaction type, ranging from 1 to 4.
- `date` - Transaction date
- `product` - Name of the product involving the transaction.
- `value` - Financial cost of the product.
- `sellerId` - ID of the product seller, which may be the creator/affiliate.

## Routes

### POST /transaction

Receive the transactions file (as multpart) and insert sellers and transactions

> example file

```
12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS
12021-12-03T11:46:02-03:00DOMINANDO INVESTIMENTOS       0000050000MARIA CANDIDA
22022-01-16T14:13:54-03:00CURSO DE BEM-ESTAR            0000012750THIAGO OLIVEIRA
42022-01-16T14:13:54-03:00CURSO DE BEM-ESTAR            0000004500THIAGO OLIVEIRA
32022-01-16T14:13:54-03:00CURSO DE BEM-ESTAR            0000004500JOSE CARLOS
12022-01-22T08:59:13-03:00DOMINANDO INVESTIMENTOS       0000050000MARIA CANDIDA
12022-02-01T23:35:43-03:00DESENVOLVEDOR FULL STACK      0000155000ELIANA NOGUEIRA
22022-02-03T17:23:37-03:00DESENVOLVEDOR FULL STACK      0000155000CARLOS BATISTA
22022-02-03T20:51:59-03:00DESENVOLVEDOR FULL STACK      0000155000CAROLINA MACHADO
22022-02-04T07:42:12-03:00DESENVOLVEDOR FULL STACK      0000155000CELSO DE MELO
42022-02-03T17:23:37-03:00DESENVOLVEDOR FULL STACK      0000050000CARLOS BATISTA
42022-02-03T20:51:59-03:00DESENVOLVEDOR FULL STACK      0000050000CAROLINA MACHADO
42022-02-04T07:42:12-03:00DESENVOLVEDOR FULL STACK      0000050000CELSO DE MELO
32022-02-03T17:23:37-03:00DESENVOLVEDOR FULL STACK      0000050000ELIANA NOGUEIRA
32022-02-03T20:51:59-03:00DESENVOLVEDOR FULL STACK      0000050000ELIANA NOGUEIRA
32022-02-04T07:42:12-03:00DESENVOLVEDOR FULL STACK      0000050000ELIANA NOGUEIRA
12022-02-19T05:33:07-03:00DOMINANDO INVESTIMENTOS       0000050000MARIA CANDIDA
12022-03-01T02:09:54-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS
12022-03-03T09:07:35-03:00DESENVOLVEDOR FULL STACK      0000155000ELIANA NOGUEIRA
12022-03-03T13:12:16-03:00DESENVOLVEDOR FULL STACK      0000155000ELIANA NOGUEIRA
```

The response can be `201 CREATED`, or `400 BAD REQUEST` if the file is invalid.

### GET /transaction

Retrieves all transactions

```json
[
  {
    "id": "9bf71936-2fe7-4fff-b935-b4202faa0733",
    "type": 1,
    "date": "2022-01-15T22:20:30.000Z",
    "product": "CURSO DE BEM-ESTAR",
    "value": 12.75,
    "sellerId": "JOSE CARLOS",
    "created_at": "2023-10-11T21:13:55.403Z",
    "updated_at": "2023-10-11T21:13:55.403Z"
  },
  {
    "id": "eab3a530-f3ef-4f33-ab59-2df6ee2bd06d",
    "type": 1,
    "date": "2021-12-03T14:46:02.000Z",
    "product": "DOMINANDO INVESTIMENTOS",
    "value": 50,
    "sellerId": "MARIA CANDIDA",
    "created_at": "2023-10-11T21:13:55.414Z",
    "updated_at": "2023-10-11T21:13:55.414Z"
  }
]
```

This route also accepts the query params:

- `sellerId` - Filter transactions by sellerId
- `perPage` - number of transactions by page
- `page` - page number

### GET /transaction/:id

Retrieves one transaction by ID

> Example response (if transaction exists)

```json
{
  "id": "9bf71936-2fe7-4fff-b935-b4202faa0733",
  "type": 1,
  "date": "2022-01-15T22:20:30.000Z",
  "product": "CURSO DE BEM-ESTAR",
  "value": 12.75,
  "sellerId": "JOSE CARLOS",
  "created_at": "2023-10-11T21:13:55.403Z",
  "updated_at": "2023-10-11T21:13:55.403Z"
}
```

> Example response (if transaction doesn't exists)

```
404 NOT FOUND
```

### GET /seller

Retrieves all sellers

```json
[
  {
    "id": "JOSE CARLOS",
    "balance": 12.75,
    "created_at": "2023-10-11T21:13:55.323Z",
    "updated_at": "2023-10-11T23:13:53.259Z",
    "transactions": [
      {
        "id": "9bf71936-2fe7-4fff-b935-b4202faa0733",
        "type": 1,
        "date": "2022-01-15T22:20:30.000Z",
        "product": "CURSO DE BEM-ESTAR",
        "value": 12.75,
        "sellerId": "JOSE CARLOS",
        "created_at": "2023-10-11T21:13:55.403Z",
        "updated_at": "2023-10-11T21:13:55.403Z"
      }
    ]
  },
  {
    "id": "MARIA CANDIDA",
    "balance": 100,
    "created_at": "2023-10-11T21:13:55.331Z",
    "updated_at": "2023-10-11T23:13:53.268Z",
    "transactions": [
      {
        "id": "eab3a530-f3ef-4f33-ab59-2df6ee2bd06d",
        "type": 1,
        "date": "2021-12-03T14:46:02.000Z",
        "product": "DOMINANDO INVESTIMENTOS",
        "value": 50,
        "sellerId": "MARIA CANDIDA",
        "created_at": "2023-10-11T21:13:55.414Z",
        "updated_at": "2023-10-11T21:13:55.414Z"
      },
      {
        "id": "6e397b66-bf84-4afe-b422-4ae218ffe706",
        "type": 1,
        "date": "2022-01-22T11:59:13.000Z",
        "product": "DOMINANDO INVESTIMENTOS",
        "value": 50,
        "sellerId": "MARIA CANDIDA",
        "created_at": "2023-10-11T21:13:55.454Z",
        "updated_at": "2023-10-11T21:13:55.454Z"
      }
    ]
  }
]
```

This route also accepts the query params:

- `perPage` - number of transactions by page
- `page` - page number

### GET /seller/:id

Retrieves one seller by ID

> Example response (if seller exists)

```json
  {
    "id": "JOSE CARLOS",
    "balance": 12.75,
    "created_at": "2023-10-11T21:13:55.323Z",
    "updated_at": "2023-10-11T23:13:53.259Z",
  },
```

> Example response (if seller doesn't exists)

```
404 NOT FOUND
```
