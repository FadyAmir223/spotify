## development

### setup
```sh
npm run docker:dev:up db-dev
npm run docker:dev:build
npm run docker:dev:up
```

### prepare
```sh
npm run docker:dev:up
docker exec -it app-dev sh
docker logs -f app-dev
npm run prisma:studio:dev:env
```

### migration
```sh
# local machine
npm run prisma:migrate:dev:env

# docker container
npm run prisma:push:dev:env
```

### use cases
```sh
# restart container
npm run docker:dev:up -- --force-recreate app-dev
```
