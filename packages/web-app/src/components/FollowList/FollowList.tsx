/** @jsxImportSource @emotion/react */
import {
  FolloweeListDocument,
  FolloweeListQuery,
  FollowerListDocument,
  FollowerListQuery,
  FollowListItemFragment,
} from "common/graphql.generated"
import {
  FollowListItem,
  FollowListItemFragments,
} from "components/FollowListItem"
import { NothingHere } from "components/NothingHere"
import gql from "graphql-tag"
import React, { FC } from "react"
import { useParams } from "react-router-dom"
import "twin.macro"
import { useQuery, UseQueryArgs } from "urql"

export const FollowList: FC<{ type: FollowListType; param: string }> = ({
  type,
  param,
}) => {
  const username = useParams()[param]

  const Component: FC<{ username: string }> = () => {
    const follows = typeMap[type].get(
      useQuery(typeMap[type].query(username))[0].data,
    )
    return follows?.length === 0 ? (
      <NothingHere message="Nothing Here" />
    ) : (
      <div>
        {follows?.map((follow) => (
          <div key={follow.id} tw="border-b border-gray-200">
            <FollowListItem fragment={follow} />
          </div>
        ))}
      </div>
    )
  }

  return <Component username={username} />
}

export const _FollowerList = gql`
  query followerList($username: String!) {
    userByName(username: $username) {
      id
      followers {
        id
        ...FollowListItem
      }
    }
  }
  ${FollowListItemFragments}
`

export const _FolloweeList = gql`
  query followeeList($username: String!) {
    userByName(username: $username) {
      id
      followees {
        id
        ...FollowListItem
      }
    }
  }
  ${FollowListItemFragments}
`

type FollowListType = "follower" | "following"

const typeMap: Record<
  FollowListType,
  {
    query: (i: any) => UseQueryArgs<object, any>
    get: (data: any) => FollowListItemFragment[] | undefined
  }
> = {
  follower: {
    query: (username: string) => ({
      query: FollowerListDocument,
      variables: { username },
    }),
    get: (data: FollowerListQuery) => data?.userByName?.followers,
  },
  following: {
    query: (username: string) => ({
      query: FolloweeListDocument,
      variables: { username },
    }),
    get: (data: FolloweeListQuery) => data?.userByName?.followees,
  },
}
