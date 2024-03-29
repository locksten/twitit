/** @jsxImportSource @emotion/react */
import { useAuth } from "common/authContext"
import { useLoggedInUserQuery } from "common/urql.generated"
import { NavButton } from "components/NavButton"
import gql from "graphql-tag"
import React, { FC, Fragment } from "react"
import "twin.macro"
import tw, { css } from "twin.macro"

export const AuthSegment: FC<{ fullWidth?: boolean }> = ({
  fullWidth,
  ...props
}) => {
  const { logOut } = useAuth()
  const user = useLoggedInUserQuery()[0].data?.me?.user

  return (
    <div
      css={css`
        ${fullWidth && tw`grid`}
      `}
      {...props}
    >
      <div tw="grid gap-2 grid-flow-col">
        <NavButton to={`/global-feed`} text="All" />
        {user ? (
          <Fragment>
            <NavButton to={`/feed`} text="Home" />
            <NavButton
              to={`/user/${user.username}/twit`}
              text={user.username}
            />
            <NavButton to={`/login`} onClick={logOut} text="Logout" />
          </Fragment>
        ) : (
          <NavButton tw="whitespace-nowrap" to="login" text="Log in" />
        )}
      </div>
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
