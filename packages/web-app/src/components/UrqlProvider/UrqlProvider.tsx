/** @jsxImportSource @emotion/react */
import { devtoolsExchange } from "@urql/devtools"
import { authExchange } from "@urql/exchange-auth"
import { cacheExchange } from "@urql/exchange-graphcache"
import { AuthState, useAuth } from "common/authContext"
import {
  MakeTwitMutation,
  MutationMakeTwitArgs,
  MyTwitListQuery,
  MyTwitListQueryVariables,
} from "common/graphql.generated"
import { _MyTwitListQuery } from "components/TwitList"
import { nanoid } from "nanoid"
import React, { FC, useState } from "react"
import "twin.macro"
import {
  createClient,
  dedupExchange,
  fetchExchange,
  makeOperation,
  Provider,
} from "urql"

export const UrqlProvider: FC<{}> = ({ children }) => {
  const { logOut, getToken } = useAuth()

  const [client] = useState(() =>
    createClient({
      url: "http://localhost:4000/graphql",
      requestPolicy: "cache-and-network",
      exchanges: [
        devtoolsExchange,
        dedupExchange,
        cacheExchange({
          updates: {
            Mutation: {
              makeTwit: (result, args, cache, info) => {
                const { makeTwit } = result as MakeTwitMutation
                cache.updateQuery<MyTwitListQuery>(
                  { query: _MyTwitListQuery },
                  (data) => {
                    makeTwit && data?.me?.user.twits.unshift(makeTwit)
                    return data
                  },
                )
              },
            },
          },
        }),
        authExchange({
          getAuth: ({ authState }) => {
            if (authState) {
              logOut()
              return null
            }
            const accessToken = getToken()
            const res: AuthState | null = accessToken ? { accessToken } : null
            return res as any
          },
          addAuthToOperation: ({ authState, operation }) => {
            const auth = authState as AuthState | null
            if (!auth?.accessToken) return operation

            const fetchOptions =
              typeof operation.context.fetchOptions === "function"
                ? operation.context.fetchOptions()
                : operation.context.fetchOptions || {}
            return makeOperation(operation.kind, operation, {
              ...operation.context,
              fetchOptions: {
                ...fetchOptions,
                headers: {
                  ...fetchOptions.headers,
                  Authorization: `Bearer ${auth.accessToken}`,
                },
              },
            })
          },
        }),
        fetchExchange,
      ],
    }),
  )

  return <Provider value={client}>{children}</Provider>
}
