# Hubla Challenge

<img src="https://framerusercontent.com/images/fJj5BFyCGfBOLk6nsGYQ64BJO80.png" alt="drawing" style="width:200px;"/>

## Objective

The goal of the challenge is develop a app to upload transactions of producers/affiliates sellers, and show the total balance of each seller.

For more instructions about the challenge, see [instructions.md](./instructions.md)

## Architecture

### [Backend](./backend/)

Backend responsibilities in this project are:

- Communication with the database, ensuring the stability of the single source of truth
- File upload
- Record of transactions and producers/affiliates
- Send transaction and producer/affiliate list (with balance)

### [Frontend](./frontend/)

Frontend responsibilities in this project are:

- Comunication with backend, returning transactions and sellers data, and uploading the sales file
- Provide a simple UI to the final user
- facilitate the access to the data

## Technologies

> Backend
- NestJS ^10.0
- Prima ^5.4.2
- Jest ^29.5.0

> Frontend
- NextJS 13.5.4
- React ^18
- Cypress "^13.3.1
- Typescript
- Tailwind ^3

## Running

### Docker Compose

To build the project with docker compose, use:

```
docker-compose build && docker-compose up
```

### NPM

See [backend](./backend/) and [frontend](./frontend/) directories.