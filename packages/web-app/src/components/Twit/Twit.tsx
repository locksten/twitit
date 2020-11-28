/** @jsxImportSource @emotion/react */
import { TwitFragment } from "common/graphql.generated"
import { LikeButton } from "components/LikeButton"
import gql from "graphql-tag"
import React, { FC } from "react"
import "twin.macro"

export const Twit: FC<{ fragment: TwitFragment }> = ({
  fragment: {
    author: { username },
    likeCount,
    iHaveLiked,
    text,
    id,
  },
  ...props
}) => {
  return (
    <div tw="p-2" {...props}>
      <div>
        <div tw="grid grid-flow-col gap-2 justify-between items-center text-sm">
          <div tw="text-gray-800">@{username}</div>
          <div tw="grid grid-flow-col gap-2 justify-end">
            <LikeButton
              authorUsername={username}
              id={id}
              likeCount={likeCount}
              iHaveLiked={iHaveLiked}
            />
          </div>
        </div>
        <p tw="px-1">{text}</p>
      </div>
    </div>
  )
}

export const _TwitFragments = gql`
  fragment Twit on Twit {
    id
    text
    likeCount
    iHaveLiked
    author {
      id
      username
    }
  }
`

const LikeTwit = gql`
  mutation likeTwit($id: ID!) {
    likeTwit(id: $id) {
      id
      ...Twit
    }
  }
  ${_TwitFragments}
`

const UnikeTwit = gql`
  mutation unlikeTwit($id: ID!) {
    unlikeTwit(id: $id) {
      id
      ...Twit
    }
  }
  ${_TwitFragments}
`
