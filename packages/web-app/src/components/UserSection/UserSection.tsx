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
import tw, { styled, css } from "twin.macro"

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

const Tabs = styled.div(
  () => css`
    ${tw`grid grid-flow-col gap-8 py-2 px-2 overflow-auto`}
    ${css`
      ::-webkit-scrollbar {
        display: none;
      }
      -ms-overflow-style: none;
      scrollbar-width: none;
    `}
  `,
)

export const UserNavbar: FC<{
  id: string
  iAmFollowing: boolean
  isLoggedInUser: boolean
}> = ({ id, iAmFollowing, isLoggedInUser }) => (
  <Tabs>
    <div tw="grid grid-flow-col gap-4">
      <NavButton relativeTo="twit" text="Twits" />
      <NavButton relativeTo="like" text="Likes" />
      <NavButton relativeTo="follower" text="Followers" />
      <NavButton relativeTo="following" text="Following" />
    </div>
    {!isLoggedInUser && <FollowButton id={id} iAmFollowing={iAmFollowing} />}
  </Tabs>
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
