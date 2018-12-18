<h1 align="center"><strong>UNROOT</strong></h1>

<br />

<div align="center"><img src="https://imgur.com/1MfnLVl.png" /></div>

<div align="center"><strong>🚀 Root Banking meets GraphQL</strong></div>
<div align="center">A GraphQL Server on top of <a href="https://root.co.za">root.co.za</a>'s programmable banking api.</div>

# Try it out here 👉 [live.unroot.co.za](https://live.unroot.co.za)
# Or here 👉 [sandbox.unroot.co.za](https://sandbox.unroot.co.za)

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

## Authenticating
Same auth method as the root api, basic with api key as user and password blank.
Test using test key provided (`test_key_tYILz1640w9q5n5kNQUZ`), base64 string for use in `"Authorization"` header: 

`"Basic dGVzdF9rZXlfdFlJTHoxNjQwdzlxNW41a05RVVo6"`

![](https://imgur.com/hElq68i.png)

## Documentation

### Commands

- `yarn start` starts GraphQL server on `http://localhost:3000` _and_ opens GraphQL Playground

- `yarn deploy` deploys application to AWS Lambda via serverless

## TODO
I haven't been able to test a bunch of queries and mutations as yet because I haven't been accepted into the private beta 💔, would love if someone with access could test some of the below and report their findings:

- [ ] Test `card` query with a valid api key
- [ ] Test `transaction` query with a valid api key
- [ ] Test `category` query with a valid api key
- [ ] Test `contact` query with a valid api key
- [ ] Test `tag` query with a valid api key

These relational queries might get a little complex.. don't want to end up in infinite loops 🤔
- [ ] Extend `Card` type to include `code`, `sensitive` and `config_variables`
- [ ] Extend `Card` type to return relational data to `Tag` instead of just the `tag_id`
- [ ] Extend `Transaction` type to return relational data to: `Tag`, `Card`, `Category` & `Contact`, instead of just returning their id's

- [ ] Implement `updateCard` resolver
- [ ] Implement `updateCategory` resolver
- [ ] Implement `updateContact` resolver
- [ ] Implement `updateTag` resolver
- [ ] Implement `updateTransaction` resolver