import React, { FC } from "react"
import "twin.macro"

export const Twit: FC<{ title: string }> = ({ title, ...props }) => (
  <div tw="font-bold p-2 border border-gray-500" {...props}>
    {title}
  </div>
)
