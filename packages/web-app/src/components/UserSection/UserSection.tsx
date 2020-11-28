/** @jsxImportSource @emotion/react */
import { useLoggedInUserQuery } from "common/urql.generated"
import { NavButton } from "components/NavButton"
import { TwitComposer } from "components/TwitComposer"
import React, { FC } from "react"
import { Outlet, useParams } from "react-router-dom"
import "twin.macro"

export const UserSection: FC<{}> = ({ ...props }) => {
  const loggedInUsername = useLoggedInUserQuery()[0].data?.me?.user.username
  const username = useParams().username
  const isLoggedInUser = username === loggedInUsername

  return (
    <div tw="" {...props}>
      <UserNavbar />
      {isLoggedInUser && <TwitComposer />}
      <Outlet />
    </div>
  )
}

export const UserNavbar: FC<{}> = ({ ...props }) => (
  <div tw="grid grid-flow-col gap-4 py-2 px-4" {...props}>
    <NavButton relativeTo="twit" text="Twits" />
    <NavButton relativeTo="mention" text="Mentions" />
    <NavButton relativeTo="like" text="Likes" />
    <NavButton relativeTo="follower" text="Followers" />
    <NavButton relativeTo="follow" text="Follows" />
  </div>
)
