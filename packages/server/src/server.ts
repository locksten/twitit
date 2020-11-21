import { ApolloServer } from "apollo-server-express/dist/ApolloServer"
import { appContext } from "context"
import express from "express"
import { schema } from "schema/schema"

const server = new ApolloServer({ schema, context: appContext })

const app = express()

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
)
