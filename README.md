<h1 align="center"><strong>UNROOT</strong></h1>

<br />

<div align="center"><img src="https://imgur.com/1MfnLVl.png" /><img src="https://i.imgur.com/GYTRiO8.png" width="200px" /></div>

<div align="center"><strong>🚀 Root Banking meets GraphQL</strong></div>
<div align="center">A GraphQL Server on top of <a href="https://root.co.za">root.co.za</a>'s programmable banking api.</div>

> Try it out here: [unroot.co.za](https://unroot.co.za)

## Features
- **Serverless Architecture:** Unroot runs on AWS Lambda which is scalable and cheap.
- **Scalable GraphQL server:** The server uses [`graphql-yoga`](https://github.com/prisma/graphql-yoga) which is based on Apollo Server & Express.
- **Tooling**: Out-of-the-box support for [GraphQL Playground](https://github.com/prisma/graphql-playground) & [query performance tracing](https://github.com/apollographql/apollo-tracing).
- **Extensible**: Simple and flexible [data model](./src/schema.graphql) – easy to adjust and extend.
- **No configuration overhead**: Preconfigured [`graphql-config`](https://github.com/prisma/graphql-config) setup.

## Requirements

You need to have the [Serverless](https://github.com/serverless/serverless/) installed to run the application locally or deploy it to your own AWS account:

```sh
npm install -g serverless
```

## Getting started

```sh
# 1. Install project dependencies with yarn
yarn

# 2. Export the STAGE env var
export STAGE=dev

# 3. Start server (runs on http://localhost:3000) and open GraphQL Playground
sls offline start
```

![](https://imgur.com/hElq68i.png)

## Documentation

### Commands

- `yarn start` starts GraphQL server on `http://localhost:3000` _and_ opens GraphQL Playground

- `yarn deploy` deploys application to AWS Lambda via serverless
