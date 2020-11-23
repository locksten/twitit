/** @jsxImportSource @emotion/react */
import React, { FC } from "react"
import "twin.macro"

export const SecondaryNavbar: FC<{}> = ({ children, ...props }) => (
  <div tw="grid grid-flow-col py-2 px-4" {...props}>
    {children}
  </div>
)
