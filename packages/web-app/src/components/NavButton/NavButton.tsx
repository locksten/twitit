/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useRelativeMatch } from "common/useRelativeMatch"
import { Button, ButtonProps } from "components/Button"
import React, { FC } from "react"
import { useMatch } from "react-router-dom"
import "twin.macro"
import tw from "twin.macro"

export const NavButton: FC<
  { relativeTo?: string; absoluteMatch?: string } & ButtonProps
> = ({ to, absoluteMatch, relativeTo, ...props }) => {
  const isAbsoluteMatch = useMatch(absoluteMatch || to || "")
  const isRelativeMatch = useRelativeMatch(relativeTo || "")
  const isMatch = isRelativeMatch || isAbsoluteMatch
  return (
    <Button
      to={to || relativeTo}
      css={css`
        ${tw`text-gray-600
             hover:(bg-orange-200 text-orange-500 shadow-md)
             active:(bg-orange-300 text-orange-600 shadow)`}
        ${isMatch && tw`bg-orange-300 text-orange-600 shadow-md`}
      `}
      {...props}
    />
  )
}
