/** @jsxImportSource @emotion/react */
import { useLoggedInUserQuery, useUserByNameQuery } from "common/urql.generated"
import { FollowButton } from "components/FollowButton"
import { NavButton } from "components/NavButton"
import { NothingHere } from "components/NothingHere"
import { TwitComposer } from "components/TwitComposer"
import gql from "graphql-tag"
import React, { FC } from "react"
import { Outlet, useParams } from "react-router-dom"
import "twin.macro"

export const UserSection: FC<{}> = ({ ...props }) => {
  const user = useUserByNameQuery({
    variables: { username: useParams().username },
  })[0].data?.userByName

  const loggedInUser = useLoggedInUserQuery()[0].data?.me?.user
  const isLoggedInUser = user?.id === loggedInUser?.id

  return user ? (
    <div {...props}>
      <UserNavbar
        id={user.id}
        iAmFollowing={user.iAmFollowing}
        isLoggedInUser={isLoggedInUser}
      />
      {isLoggedInUser && <TwitComposer />}
      <Outlet />
    </div>
  ) : (
    <NothingHere message={"User Not Found"} />
  )
}

export const UserNavbar: FC<{
  id: string
  iAmFollowing: boolean
  isLoggedInUser: boolean
}> = ({ id, iAmFollowing, isLoggedInUser, ...props }) => (
  <div tw="grid grid-flow-col gap-8 py-2 px-2 overflow-auto" {...props}>
    <div tw="grid grid-flow-col gap-4">
      <NavButton relativeTo="twit" text="Twits" />
      {/* <NavButton relativeTo="mention" text="Mentions" /> */}
      <NavButton relativeTo="like" text="Likes" />
      <NavButton relativeTo="follower" text="Followers" />
      <NavButton relativeTo="following" text="Following" />
    </div>
    {!isLoggedInUser && <FollowButton id={id} iAmFollowing={iAmFollowing} />}
  </div>
)

export const _UserByName = gql`
  query userByName($username: String!) {
    userByName(username: $username) {
      id
      username
      iAmFollowing
    }
  }
`
