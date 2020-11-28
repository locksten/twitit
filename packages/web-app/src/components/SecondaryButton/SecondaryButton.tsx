/** @jsxImportSource @emotion/react */
import { Button, ButtonProps } from "components/Button"
import React, { FC } from "react"
import "twin.macro"
import tw, { css } from "twin.macro"

export type SecondaryButtonProps = ButtonProps & {
  isActive?: boolean
  isDisabled?: boolean
  text: string
}

export const SecondaryButton: FC<SecondaryButtonProps> = ({
  isActive = false,
  isDisabled = false,
  ...props
}) => (
  <Button
    css={css`
      ${tw`text-gray-600`}
      ${isDisabled
        ? tw`cursor`
        : tw`hover:(bg-orange-200 text-orange-500)
             active:(bg-orange-300 text-orange-600)`}
      ${isActive && tw`bg-orange-300 text-orange-600`}
    `}
    isDisabled={isDisabled}
    {...props}
  />
)
