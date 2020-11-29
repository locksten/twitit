/** @jsxImportSource @emotion/react */
import React, { FC } from "react"
import "twin.macro"

export const NothingHere: FC<{
  message: "Nothing Here" | "User Not Found"
}> = ({ message, ...props }) => (
  <div tw="py-8 text-xl text-center font-bold text-gray-400" {...props}>
    {message}
  </div>
)
