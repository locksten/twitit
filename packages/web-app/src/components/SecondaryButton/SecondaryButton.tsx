/** @jsxImportSource @emotion/react */
import { Button } from "components/Button"
import React, { FC } from "react"
import "twin.macro"

type SecondaryButtonProps = Parameters<typeof Button>[0] & { text: string }

export const SecondaryButton: FC<SecondaryButtonProps> = ({ ...props }) => (
  <Button
    tw="text-gray-600
        hover:(bg-orange-200 text-orange-500)
        active:(bg-orange-300 text-orange-600)"
    {...props}
  />
)
