// import { GraphQLServer } from 'graphql-yoga'
import { GraphQLServerLambda } from 'graphql-yoga'
import root from './root'
import * as typeDefs from './schema.graphql'

const resolvers = {
  Query: {
    account (parent, args, context, info) {
      return root.account(context)
    },
    transaction (parent, args, context, info) {
      return root.transaction(context, args)
    },
    transactions (parent, args, context, info) {
      return root.transactions(context)
    },
    card (parent, args, context, info) {
      return root.card(context, args)
    },
    cards (parent, args, context, info) {
      return root.cards(context)
    },
    category (parent, args, context, info) {
      return root.category(context, args)
    },
    categories (parent, args, context, info) {
      return root.categories(context)
    },
    contact (parent, args, context, info) {
      return root.contact(context, args)
    },
    contacts (parent, args, context, info) {
      return root.contacts(context)
    },
    tag (parent, args, context, info) {
      return root.tag(context, args)
    },
    tags (parent, args, context, info) {
      return root.tags(context)
    },
  },
  Mutation: {
    createCard(parent, args, context, info) {
      return root.createCard(context, args)
    },
    createCategory(parent, args, context, info) {
      return root.createCategory(context, args)
    },
    createContact(parent, args, context, info) {
      return root.createContact(context, args)
    },
    createTag(parent, args, context, info) {
      return root.createTag(context, args)
    },
    createTransaction(parent, args, context, info) {
      return root.createTransaction(context, args)
    },
  
    deleteCard(parent, args, context, info) {
      return root.deleteCard(context, args)
    },
    deleteCategory(parent, args, context, info) {
      return root.deleteCategory(context, args)
    },
    deleteContact(parent, args, context, info) {
      return root.deleteContact(context, args)
    },
    deleteTag(parent, args, context, info) {
      return root.deleteTag(context, args)
    },
  
    updateCard(parent, args, context, info) {
      // TODO: Implement resolver
      // (id: ID!, name: String, transaction_limit: Int, daily_limit: Int, monthly_limit: Int, tag_id: Int, lock: Boolean, pin: String, secure_code: String, code: String): Card
    },
    updateCategory(parent, args, context, info) {
      // TODO: Implement resolver
      // (id: ID!, name: String!): Category
    },
    updateContact(parent, args, context, info) {
      // TODO: Implement resolver
      // (id: ID!, name: String, bank_number: String, bank_name: String, email: String): Contact
    },
    updateTag(parent, args, context, info) {
      // TODO: Implement resolver
      // (id: ID!, name: String, tag_limit: String): Tag
    },
    updateTransaction(parent, args, context, info) {
      // TODO: Implement resolver
      // (id: ID!, category_id: ID, category_rule: Rule, tag_ids: [ID]): Transaction
    },
  
  },
}

const lambda = new GraphQLServerLambda({
  typeDefs,
  resolvers,
  context: req => ({
    ...req,
  })
})

exports.server = lambda.graphqlHandler
exports.playground = lambda.playgroundHandler