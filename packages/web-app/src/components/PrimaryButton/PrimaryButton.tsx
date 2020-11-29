/** @jsxImportSource @emotion/react */
import { Button, ButtonProps } from "components/Button"
import React, { FC } from "react"
import "twin.macro"

export const PrimaryButton: FC<ButtonProps> = ({ ...props }) => (
  <Button
    tw="bg-orange-300 text-orange-600
        hover:(bg-orange-400 text-orange-700)
        active:(bg-orange-500 text-orange-800 shadow-inner)"
    {...props}
  />
)
