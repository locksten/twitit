/** @jsxImportSource @emotion/react */
import { SecondaryButton } from "components/SecondaryButton"
import gql from "graphql-tag"
import { TwitFragment } from "graphql.generated"
import React, { FC } from "react"
import "twin.macro"

export const Twit: FC<{ fragment: TwitFragment }> = ({
  fragment: {
    author: { username },
    text,
  },
  ...props
}) => {
  return (
    <div tw="p-2" {...props}>
      <div>
        <div tw="grid grid-flow-col gap-2 justify-between items-center text-sm">
          <div tw="text-gray-800">@{username}</div>
          <div tw="grid grid-flow-col gap-2 justify-end">
            <SecondaryButton text="Retwit" />
            <SecondaryButton text="Like" />
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
    author {
      id
      username
    }
  }
`
