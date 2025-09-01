# Variaveis de Ambiente

## Passo 1: Copiar os exemplos das variaveis de Ambiente

```bash
cp .env.example .env
```

## Passo 2: Definir as variaveis de ambiente

```bash
NODE_ENV=dev
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgrespw
DATABASE_NAME=postgres
SALT=10
JWT_SECRET=sei_municipal
PORT=3000
ACCESS_TOKEN_EXPIRES_IN_SECONDS=3600
REFRESH_TOKEN_EXPIRES_IN_SECONDS=86400
```

## Iniciar Projeto

```bash
docker-compose up -d nest-dev
```

# Comandos Uteis

### Parar e remover containers e redes

```bash
docker-compose down
```

### Parar e remover containers, redes E volumes

```bash
docker-compose down -v
```

### Parar apenas os containers (sem remover)

```bash
docker-compose stop
```
