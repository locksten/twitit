/** @jsxImportSource @emotion/react */
import { SecondaryButton } from "components/SecondaryButton"
import React, { FC } from "react"
import "twin.macro"

export const Twit: FC<{ username: string; text: string }> = ({
  username,
  text,
  ...props
}) => (
  <div tw="p-3" {...props}>
    <div>
      <div tw="font-bold">@{username}</div>
      <p tw="px-1">{text}</p>
      <div tw="-mb-2 -mx-2 grid grid-flow-col gap-2 text-sm">
        <SecondaryButton text="Reply" />
        <SecondaryButton text="Retwit" />
        <SecondaryButton text="Like" />
      </div>
    </div>
  </div>
)
