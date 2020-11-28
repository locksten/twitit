/* eslint-disable jsx-a11y/anchor-is-valid */
/** @jsxImportSource @emotion/react */
import { FocusRing } from "components/FocusRing"
import React, { FC, MouseEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import "twin.macro"

export type ClickableProps = {
  onClick?: (e: React.MouseEvent) => void
  link?: string
  to?: string
  replace?: boolean
  isDisabled?: boolean
  type?: "link" | "button" | "submitButton" | "resetButton"
}

export const Clickable: FC<ClickableProps> = ({
  type,
  link,
  to,
  onClick,
  isDisabled = false,
  children,
  ...props
}) => {
  const navigate = useNavigate()

  const clickHandler = (e: MouseEvent) => {
    if (isDisabled) return
    to && navigate(to)
    onClick?.(e)
  }

  return to && !type ? (
    <FocusRing>
      <Link tw="focus:outline-none" to={to} onClick={clickHandler} {...props}>
        {children}
      </Link>
    </FocusRing>
  ) : type === undefined && link !== undefined ? (
    <FocusRing>
      <a tw="focus:outline-none" onClick={clickHandler} href={link} {...props}>
        {children}
      </a>
    </FocusRing>
  ) : (
    <FocusRing>
      <button
        tw="focus:outline-none"
        onClick={clickHandler}
        type={
          type === "submitButton"
            ? "submit"
            : type === "resetButton"
            ? "reset"
            : "button"
        }
        {...props}
      >
        {children}
      </button>
    </FocusRing>
  )
}
