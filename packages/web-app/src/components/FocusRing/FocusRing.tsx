/** @jsxImportSource @emotion/react */
import { ClassNames } from "@emotion/react"
import { FocusRing as AriaFocusRing } from "@react-aria/focus"
import React, { FC, ReactElement } from "react"
import "twin.macro"
import { theme } from "twin.macro"

export const FocusRing: FC<{
  children: ReactElement
  alwaysShow?: boolean
}> = ({ children, alwaysShow }) => (
  <ClassNames>
    {({ css }) => {
      return (
        <AriaFocusRing
          focusClass={css`
            ${alwaysShow &&
            css`
              box-shadow: inset 0 0 0 3px ${theme`colors.orange.200`};
            `}
          `}
          focusRingClass={css`
            box-shadow: inset 0 0 0 3px ${theme`colors.orange.200`};
          `}
        >
          {children}
        </AriaFocusRing>
      )
    }}
  </ClassNames>
)
