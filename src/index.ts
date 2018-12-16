// import { GraphQLServer } from 'graphql-yoga'
import { GraphQLServerLambda } from 'graphql-yoga'
import root from './root'

const resolvers = {
  Query: {
    account(parent, args, context, info) {
      return root.account(context)
    },
  },
  Mutation: {
    createCard(parent, args, context, info) {
      return root.account(context)
    },
  },
}

const lambda = new GraphQLServerLambda({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
  })
})

exports.server = lambda.graphqlHandler
exports.playground = lambda.playgroundHandler