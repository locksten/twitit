/** @jsxImportSource @emotion/react */
import {
  HashtagTwitListDocument,
  HashtagTwitListQuery,
  LikedTwitListDocument,
  LikedTwitListQuery,
  TwitFragment,
  UserTwitListDocument,
  UserTwitListQuery,
} from "common/graphql.generated"
import { Twit, _TwitFragments } from "components/Twit"
import gql from "graphql-tag"
import React, { FC } from "react"
import { useParams } from "react-router-dom"
import "twin.macro"
import { useQuery, UseQueryArgs } from "urql"

export const TwitList: FC<{ type: TwitListType; param: string }> = ({
  param,
  type,
}) => {
  const identifier = useParams()[param]
  const Component: FC<{ identifier: string }> = () => {
    const twits = typeMap[type].get(
      useQuery(typeMap[type].query(identifier))[0].data,
    )
    return (
      <div>
        {twits?.map((twit) => (
          <div key={twit.id} tw="border-b border-gray-200">
            <Twit fragment={twit} />
          </div>
        ))}
      </div>
    )
  }

  return <Component identifier={identifier} />
}

export const _MyTwitListQuery = gql`
  query MyTwitList {
    me {
      id
      user {
        id
        twits {
          id
          ...Twit
        }
      }
    }
  }
  ${_TwitFragments}
`

export const _HashtagTwitList = gql`
  query hashtagTwitList($text: String!) {
    hashtagByText(text: $text) {
      id
      twits {
        id
        ...Twit
      }
    }
  }
  ${_TwitFragments}
`

export const _UserTwitList = gql`
  query userTwitList($username: String!) {
    userByName(username: $username) {
      id
      twits {
        id
        ...Twit
      }
    }
  }
  ${_TwitFragments}
`

export const _LikedTwitList = gql`
  query likedTwitList($username: String!) {
    userByName(username: $username) {
      id
      likedTwits {
        id
        ...Twit
      }
    }
  }
  ${_TwitFragments}
`

type TwitListType = "hashtag" | "user" | "liked"

const typeMap: Record<
  TwitListType,
  {
    query: (i: any) => UseQueryArgs<object, any>
    get: (data: any) => TwitFragment[] | undefined
  }
> = {
  hashtag: {
    query: (text: string) => ({
      query: HashtagTwitListDocument,
      variables: { text },
    }),
    get: (data: HashtagTwitListQuery) => data?.hashtagByText?.twits,
  },
  user: {
    query: (username: string) => ({
      query: UserTwitListDocument,
      variables: { username },
    }),
    get: (data: UserTwitListQuery) => data?.userByName?.twits,
  },
  liked: {
    query: (username: string) => ({
      query: LikedTwitListDocument,
      variables: { username },
    }),
    get: (data: LikedTwitListQuery) => data?.userByName?.likedTwits,
  },
}
