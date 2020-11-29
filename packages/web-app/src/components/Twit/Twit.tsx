/** @jsxImportSource @emotion/react */
import { TwitFragment } from "common/graphql.generated"
import { LikeButton } from "components/LikeButton"
import gql from "graphql-tag"
import React, { FC } from "react"
import { Link } from "react-router-dom"
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
          <Link to={`/user/${username}/twit`} tw="text-gray-800">
            @{username}
          </Link>
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
