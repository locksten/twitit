/** @jsxImportSource @emotion/react */
import { Button, ButtonProps } from "components/Button"
import React, { FC } from "react"
import "twin.macro"

export const PrimaryButton: FC<ButtonProps> = ({ ...props }) => (
  <Button
    tw="bg-orange-200 text-orange-500 shadow-md
        hover:(bg-orange-300 text-orange-600)
        active:(bg-orange-400 text-orange-700 shadow)"
    {...props}
  />
)
