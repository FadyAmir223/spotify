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
npm run email:dev:env
```


### install
any modification in node_modules should be applied in local machine for vscode intellicance,
and in docker container for funtionality.

if it modifies package-lock.json like installation,
then install on local first then on container so when your college pulls the repo and builds the docker image, it succeeds.


### migration
usually order wouldn't matter but when directory is created from the container it has root prevligae not user.

don't create migration files twice

```sh
# local machine
npm run prisma:migrate:dev:env

# docker container
npm run prisma:push:dev:env
```


### use cases
`--` to not pass the option to npm but to docker

```sh
# restart container
# e.g. for updating a schema
npm run docker:dev:up -- --force-recreate app-dev
```


## choices

### uuid
use `crypto.randomUUID()` instead of `uuidv4()` because it's x3-5 faster as it's part of node eco-system

### context
Why split `SongContext` into `ValueSongContext` and `DispatchSongContext`? <br />
because the buttons responsible for setting the song will re-render, 
even though they are not using its data

### ky
uses `fetch()` under the hood, leveraging the syntactic sugar like axios and the extended API of next.js


## TODO:
- favorites

- search
- infinite scroll reslults

- artist layout
- upload form
- drag & drop
- image crop

- download song detect name

- payment

- vercel version
- video
