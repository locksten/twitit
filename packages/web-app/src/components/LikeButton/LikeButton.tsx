/** @jsxImportSource @emotion/react */
import {
  useLikeTwitMutation,
  useLoggedInUserQuery,
  useUnlikeTwitMutation,
} from "common/urql.generated"
import { SecondaryButton } from "components/SecondaryButton"
import React, { FC } from "react"
import "twin.macro"
import tw, { css } from "twin.macro"

export const LikeButton: FC<{
  id: string
  authorUsername: string
  likeCount: number
  iHaveLiked: boolean
}> = ({ authorUsername, id, likeCount, iHaveLiked, ...props }) => {
  const loggedInUsername = useLoggedInUserQuery()[0].data?.me?.user.username
  const isAuthor = authorUsername === loggedInUsername

  const [_, likeTwit] = useLikeTwitMutation()
  const [__, unlikeTwit] = useUnlikeTwitMutation()

  return (
    <SecondaryButton
      css={css`
        ${tw`text-orange-500 hover:shadow-md active:shadow`}
        ${iHaveLiked && tw`shadow-md`}
        ${!likeCount &&
        css`
          text-shadow: 0 0 0 rgba(231, 110, 50, 0.4);
          color: transparent;
        `}
      `}
      isActive={iHaveLiked}
      isDisabled={isAuthor}
      onClick={() => {
        iHaveLiked ? unlikeTwit({ id }) : likeTwit({ id })
      }}
      text={`${likeCount === 0 ? `` : `${likeCount} `}🧡`}
      {...props}
    />
  )
}
