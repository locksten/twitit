/** @jsxImportSource @emotion/react */
import { FollowListItemFragment } from "common/graphql.generated"
import { useLoggedInUserQuery } from "common/urql.generated"
import { FollowButton } from "components/FollowButton"
import { SecondaryButton } from "components/SecondaryButton"
import gql from "graphql-tag"
import React, { FC } from "react"
import "twin.macro"

export const FollowListItem: FC<{ fragment: FollowListItemFragment }> = ({
  fragment: { id, username, followeeCount, followerCount, iAmFollowing },
  ...props
}) => {
  const loggedInUser = useLoggedInUserQuery()[0].data?.me?.user
  const isLoggedInUser = id === loggedInUser?.id

  return (
    <div tw="flex justify-between items-center py-1 px-2" {...props}>
      <div tw="font-bold">@{username}</div>
      <div>
        <div tw="grid grid-flow-col items-center gap-4">
          <div tw="grid sm:grid-flow-col">
            <LabeledCount label="followers" count={followerCount} />
            <LabeledCount label="following" count={followeeCount} />
          </div>
          <div tw="w-24 flex justify-end">
            {isLoggedInUser ? (
              <SecondaryButton text="Me" isDisabled />
            ) : (
              <FollowButton id={id} iAmFollowing={iAmFollowing} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const LabeledCount: FC<{ label: string; count: number }> = ({
  label,
  count,
}) => (
  <div tw="grid grid-flow-col gap-2">
    <div tw="w-8 text-right">{count}</div>
    <div tw="text-gray-500">{label}</div>
  </div>
)

export const FollowListItemFragments = gql`
  fragment FollowListItem on User {
    id
    username
    followerCount
    followeeCount
    iAmFollowing
  }
`

//   return (
//     <div tw="flex justify-between py-1 px-2" {...props}>
//       <div tw="font-bold">@{username}</div>
//       <div>
//         <div tw="grid grid-flow-col gap-4">
//           <LabeledCount label="followers" count={followerCount} />
//           <LabeledCount label="following" count={followeeCount} />
//           <div tw="w-24 flex justify-end">
//             {isLoggedInUser ? (
//               <SecondaryButton text="Me" isDisabled />
//             ) : (
//               <FollowButton id={id} iAmFollowing={iAmFollowing} />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
