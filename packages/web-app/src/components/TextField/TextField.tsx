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
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    { name, size, type = "text", autocomplete = false, placeholder, ...props },
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
          size={size}
          {...props}
        />
      </FocusRing>
    )
  },
)
