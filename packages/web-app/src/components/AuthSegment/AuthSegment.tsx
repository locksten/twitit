/** @jsxImportSource @emotion/react */
import { useAuth } from "common/authContext"
import { useLoggedInUserQuery } from "common/urql.generated"
import { NavButton } from "components/NavButton"
import gql from "graphql-tag"
import React, { FC } from "react"
import "twin.macro"

export const AuthSegment: FC<{}> = ({ ...props }) => {
  const { logOut } = useAuth()

  const [{ data: me }, _] = useLoggedInUserQuery()
  const user = me?.me?.user

  return (
    <div tw="" {...props}>
      {user ? (
        <div tw="grid gap-2 grid-flow-col">
          <NavButton to={`/feed`} text="Home" />
          <NavButton to={`/user/${user.username}/twit`} text={user.username} />
          <NavButton to={`/login`} onClick={logOut} text="Logout" />
        </div>
      ) : (
        <NavButton to="login" text="login" />
      )}
    </div>
  )
}

export const _LoggedInUser = gql`
  query LoggedInUser {
    me {
      __typename
      id
      user {
        __typename
        id
        username
      }
    }
  }
`
