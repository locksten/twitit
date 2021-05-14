/** @jsxImportSource @emotion/react */
import { FocusRing } from "components/FocusRing"
import React, { forwardRef } from "react"
import "twin.macro"

type TextFieldProps = {
  name: string
  autocomplete?: boolean
  type?: string
  placeholder?: string
  size?: number
  autoFocus?: boolean
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      name,
      size,
      type = "text",
      autocomplete = false,
      placeholder,
      autoFocus,
      ...props
    },
    ref,
  ) => {
    return (
      <FocusRing alwaysShow>
        <input
          tw="rounded-md border border-gray-200 shadow-inner p-2 py-1 focus:outline-none"
          name={name}
          ref={ref}
          type={type}
          placeholder={placeholder}
          autoComplete={autocomplete ? "on" : "off"}
          autoFocus={autoFocus}
          size={size}
          {...props}
        />
      </FocusRing>
    )
  },
)
