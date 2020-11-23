/** @jsxImportSource @emotion/react */
import { Clickable, ClickableProps } from "components/Clickable"
import React, { FC } from "react"
import "twin.macro"

type ButtonProps = ClickableProps & { text: string }

export const Button: FC<ButtonProps> = ({ text, ...props }) => (
  <Clickable
    tw="py-1 px-2 rounded-md
        flex justify-center items-center"
    {...props}
  >
    {text}
  </Clickable>
)
