/** @jsxImportSource @emotion/react */
import { Button, ButtonProps } from "components/Button"
import React, { FC } from "react"
import "twin.macro"
import tw, { css } from "twin.macro"

export const SecondaryButton: FC<
  { isActive?: boolean; isDisabled?: boolean } & ButtonProps
> = ({ isActive, isDisabled, ...props }) => (
  <Button
    css={css`
      ${tw`bg-orange-200 text-orange-500`}
      ${isDisabled
        ? tw`cursor-default`
        : tw`hover:(bg-orange-300 text-orange-600)
         active:(bg-orange-400 text-orange-700 shadow-inner)`}
      ${isActive &&
      tw`bg-orange-300 text-orange-600
         active:(bg-orange-400 text-orange-700 shadow-inner)`}
    `}
    {...props}
  />
)
