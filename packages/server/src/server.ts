import {
  getIntrospectedSchema,
  minifyIntrospectionQuery,
} from "@urql/introspection"
import { ApolloServer } from "apollo-server-express/dist/ApolloServer"
import { newAppContext } from "context"
import express from "express"
import * as fs from "fs"
import { getIntrospectionQuery } from "graphql"
import fetch from "node-fetch"
import { schema } from "schema/schema"

const server = new ApolloServer({
  schema,
  context: newAppContext,
})

const app = express()

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () => {
  fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      variables: {},
      query: getIntrospectionQuery({ descriptions: false }),
    }),
  })
    .then((result) => result.json())
    .then(({ data }) => {
      const minified = minifyIntrospectionQuery(getIntrospectedSchema(data))
      fs.writeFileSync(
        "./graphql-schema.generated.json",
        JSON.stringify(minified),
      )
    })

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
})
