/** @jsxImportSource @emotion/react */
import { AuthSegment } from "components/AuthSegment"
import { NavButton } from "components/NavButton"
import { TextField } from "components/TextField"
import React, { FC } from "react"
import "twin.macro"

export const MainNavbar: FC<{}> = ({ ...props }) => {
  return (
    <div tw="flex justify-between py-2 px-4">
      <div tw="grid grid-flow-col gap-2" {...props}>
        <TextField name="search" placeholder="Search" size={9} />
        <NavButton to="hashtag/react/twit" text="#react" />
        <NavButton to="hashtag/graphql/twit" text="#graphql" />
        <NavButton to="user/bob/twit" absoluteMatch="user/bob/*" text="@bob" />
        <NavButton to="user/eve/twit" absoluteMatch="user/eve/*" text="@eve" />
      </div>
      <div tw="grid grid-flow-col gap-2">
        <AuthSegment />
      </div>
    </div>
  )
}
