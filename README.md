# A simplified clone of spotify music player

### [Video](https://youtu.be/LLO6_pNr1d0)


## What's improved since `allbirds` project ?
- docker staging step instead of only development and production
- multi stage docker build for lower image size
- usage of commitlint and aribnb's eslint config
- css obfuscation to reduce the size of style file shipped to the client

- file upload and drag & drop with image crop and preview
- infinite scroll with intersection observer instead of naive scroll listener
- loading skeleton instead of spinner

- full website accessability and usage of shadcn-ui
- SEO: metadata, robots.txt and dynamic sitemaps
- zod validation for
  - params
  - searchParams
  - localStorage
  - environment variables
  - user input
  - server payload


## Choices

### uuid
use `crypto.randomUUID()` instead of `uuidv4()` because it's x3-5 faster as it's part of node eco-system

### context
Why split `SongContext` into `ValueSongContext` and `DispatchSongContext`? <br />
because the buttons responsible for setting the song will re-render, 
even though they are not using its data

### ky
uses `fetch()` under the hood, leveraging the syntactic sugar like axios and the extended API of next.js

### ISR
`/artist/:id` uses incremental static regeneration as it is not user speicifc data and not frequently changing, then revalidated each half hour for updates. 
SSR will be applied for new users

### image crop & comporession - client vs server
- consume server bandwidth
- overload the server with large number of users
- it would be better to take 2s of proccessing on the client,
  than taking the same 2s of sending high qulatiy image to the server to be procesed
- it's better to check only whether the image has the right size, format and dimentions on the server


## Development

### Getting started
```sh
npm run docker:dev:up db-dev
npm run docker:dev:build
npm run docker:dev:up
```


### Every time
```sh
npm run docker:dev:up
docker exec -it app-dev sh
docker logs -f app-dev
npm run prisma:studio:dev:env
npm run email:dev:env
```


### Install
any modification in node_modules should be applied in local machine for vscode intellicance,
and in docker container for funtionality. <br />
if it modifies package-lock.json like installation,
then install on local first then on container so when your college pulls the repo and builds the docker image, it succeeds.


### Migration
usually order wouldn't matter but when directory is created from the container it has root prevligae not user.

don't create migration files twice

```sh
# local machine
npm run prisma:migrate:dev:env

# docker container
npm run prisma:push:dev:env
```


### Use cases
`--` to not pass the option to npm but to docker

```sh
# restart container
# e.g. for updating a schema
npm run docker:dev:up -- --force-recreate app-dev
```


## TODO:
- traefik config
- CI/CD for docker build and push
- vercel version
- download song
- payment
