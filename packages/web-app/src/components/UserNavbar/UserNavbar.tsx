/** @jsxImportSource @emotion/react */
import { SecondaryButton } from "components/SecondaryButton"
import { SecondaryNavbar } from "components/SecondaryNavbar"
import React, { FC } from "react"
import "twin.macro"

export const UserNavbar: FC<{}> = ({ ...props }) => (
  <SecondaryNavbar {...props}>
    <SecondaryButton text="Twits" />
    <SecondaryButton text="Home" />
    <SecondaryButton text="Mentions" />
    <SecondaryButton text="Likes" />
    <SecondaryButton text="Followers" />
    <SecondaryButton text="Follows" />
  </SecondaryNavbar>
)
