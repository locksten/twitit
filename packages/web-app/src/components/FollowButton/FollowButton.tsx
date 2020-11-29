/** @jsxImportSource @emotion/react */
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "common/urql.generated"
import { Button } from "components/Button"
import { SecondaryButton } from "components/SecondaryButton"
import gql from "graphql-tag"
import React, { FC } from "react"
import "twin.macro"
import tw, { css } from "twin.macro"

export const FollowButton: FC<{
  id: string
  iAmFollowing: boolean
}> = ({ id, iAmFollowing, ...props }) => {
  const [_, followUser] = useFollowUserMutation()
  const [__, unfollowUser] = useUnfollowUserMutation()

  return (
    <SecondaryButton
      onClick={() => {
        iAmFollowing ? unfollowUser({ id }) : followUser({ id })
      }}
      isActive={iAmFollowing}
      text={`${iAmFollowing ? "Unfollow" : "Follow"}`}
      {...props}
    />
  )
}

const FollowUser = gql`
  mutation followUser($id: ID!) {
    followUser(id: $id) {
      id
      followeeCount
      followerCount
      iAmFollowing
    }
  }
`

const UnfollowUser = gql`
  mutation unfollowUser($id: ID!) {
    unfollowUser(id: $id) {
      id
      followeeCount
      followerCount
      iAmFollowing
    }
  }
`
