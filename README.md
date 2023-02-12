# resvu-api

## Get Started

1. `yarn`
2. Add a `.env` file to set the `postgresql` database configuration:

```
DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<db-name>?schema=<schema>"
```

3. Make sure `service-account.json` is in the root of this repo and add it to the `.env` file:

```
GOOGLE_APPLICATION_CREDENTIALS="<path-to-service-account-file>"
```

4. Add the `redis` configuration to the `.env`:

```
REDIS_HOST="<redis-host>"
REDIS_PORT=<redis-port>
REDIS_PASSWORD="<redis-password>"
```

## Local Development

### Prerequisites

- [docker](https://docs.docker.com/get-docker/)
- [docker-compose](https://docs.docker.com/compose/install/)

### Starting server

1. Start docker daemon
2. Add the `postgresql` configuration to the `.env` file:

```
POSTGRES_USER="<username>"
POSTGRES_PASSWORD="<password>"
POSTGRES_DB=<db-name>
```

3. Add the `pgadmin4` configuration to the `.env` file:

```
PGADMIN_DEFAULT_EMAIL=<admin-email>
PGADMIN_DEFAULT_PASSWORD=<admin-password>
PGADMIN_LISTEN_PORT=<port>
```

4. Start postgresql, pgadmin4 and redis:

```
make docker-up
```

5. Create tables:

```
npx prisma db push
```

6. Seed the database:

```
npx prisma db seed
```

7. Generate the prisma client:

```
npx prisma generate
```

8. Start the apollo server:

```
yarn dev
```

### Cleanup

```
make docker-down
```

## Query database


```
query Query {
  requests {
    nodes {
      id
      number
      priority
    }
  }
}
```

Remember adding the Authorization token to the HTTP headers:
```
"Authorization": "Bearer [firebase_auth_token]"
```

