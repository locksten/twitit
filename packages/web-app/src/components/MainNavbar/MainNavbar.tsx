/** @jsxImportSource @emotion/react */
import { SecondaryButton } from "components/SecondaryButton"
import React, { FC } from "react"
import "twin.macro"

export const MainNavbar: FC<{}> = ({ ...props }) => (
  <div tw="flex justify-between py-2 px-4">
    <div tw="grid grid-flow-col gap-2" {...props}>
      <input
        size={10}
        placeholder="search"
        tw="max-w-sm rounded-md border border-gray-300 px-2"
      ></input>
      <SecondaryButton text="#twitit" />
      <SecondaryButton text="#project" />
      <SecondaryButton text="#react" />
      <SecondaryButton text="#graphql" />
      <SecondaryButton text="#tailwind" />
      <SecondaryButton text="@bob" />
      <SecondaryButton text="save #current" />
    </div>
    <div tw="grid grid-flow-col gap-2">
      <SecondaryButton text="@alice" />
    </div>
  </div>
)
