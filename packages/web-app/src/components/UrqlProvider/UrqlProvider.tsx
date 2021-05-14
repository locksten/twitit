/** @jsxImportSource @emotion/react */
import { devtoolsExchange } from "@urql/devtools"
import { authExchange } from "@urql/exchange-auth"
import { cacheExchange } from "@urql/exchange-graphcache"
import { AuthState, useAuth } from "common/authContext"
import {
  FolloweeListQueryVariables,
  FollowerListQuery,
  FollowUserMutation,
  MakeTwitMutation,
  MyTwitListQuery,
  MyTwitListQueryVariables,
} from "common/graphql.generated"
import { _FollowerList } from "components/FollowList"
import { _MyTwitListQuery } from "components/TwitList"
import React, { FC, useState } from "react"
import "twin.macro"
import {
  createClient,
  dedupExchange,
  fetchExchange,
  makeOperation,
  Provider,
} from "urql"
import schema from "../../common/graphql-schema.generated.json"

export const UrqlProvider: FC<{}> = ({ children }) => {
  const { logOut, getToken } = useAuth()

  const [client] = useState(() =>
    createClient({
      url:
        process.env.REACT_APP_GRAPHQL_SERVER ?? "http://localhost:4000/graphql",
      requestPolicy: "cache-and-network",
      exchanges: [
        devtoolsExchange,
        dedupExchange,
        cacheExchange({
          schema: schema as any,
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
              // followUser: (result, args, cache, info) => {
              //   const users = (result as FollowUserMutation).followUser
              //   if (!users) return
              //   const follower = users[0]
              //   const followee = users[1]

              //   cache.updateQuery<FollowerListQuery, FolloweeListQueryVariables>(
              //     { query: _FollowerList, variables: { username: followee.username } },
              //     (data) => {
              //       data?.me?...unshift()
              //       return data
              //     },
              //   )
              // },
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
