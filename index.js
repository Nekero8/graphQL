'use strict'
require('dotenv').config();
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const cors = require('cors');
const graphqlHTTP = require('express-graphql').graphqlHTTP
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')

const app = express()
const port = process.env.port || 3000
const isDev = process.env.NODE_ENV !== 'production'

// define Schema
const typeDefs = readFileSync(join(__dirname, 'lib', 'schema.graphql'), 'utf-8')
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

app.use(cors())

app.use(
  '/api',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: isDev, // disable graphiQL for Development
  })
)

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/api`)
})
