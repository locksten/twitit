/** @jsxImportSource @emotion/react */
import {
  useLikeTwitMutation,
  useLoggedInUserQuery,
  useUnlikeTwitMutation,
} from "common/urql.generated"
import { Button } from "components/Button"
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
    <Button
      css={css`
        ${tw`text-orange-500`}
        ${isAuthor
          ? tw`cursor`
          : tw`hover:(bg-orange-200 text-orange-500)
               active:(bg-orange-300 text-orange-600 shadow-inner)`}
        ${iHaveLiked && tw`bg-orange-300 text-orange-600`}
        ${!likeCount &&
        css`
          text-shadow: 0 0 0 rgba(231, 110, 50, 0.4);
          color: transparent;
        `}
      `}
      isDisabled={isAuthor}
      onClick={() => {
        iHaveLiked ? unlikeTwit({ id }) : likeTwit({ id })
      }}
      text={`${likeCount === 0 ? `` : `${likeCount} `}🧡`}
      {...props}
    />
  )
}
