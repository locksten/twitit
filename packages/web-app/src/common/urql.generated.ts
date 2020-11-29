import {
  LoggedInUserQueryVariables,
  LoggedInUserQuery,
  LoggedInUserDocument,
  FollowUserMutation,
  FollowUserMutationVariables,
  FollowUserDocument,
  UnfollowUserMutation,
  UnfollowUserMutationVariables,
  UnfollowUserDocument,
  FollowerListQueryVariables,
  FollowerListQuery,
  FollowerListDocument,
  FolloweeListQueryVariables,
  FolloweeListQuery,
  FolloweeListDocument,
  LoginMutation,
  LoginMutationVariables,
  LoginDocument,
  RegisterMutation,
  RegisterMutationVariables,
  RegisterDocument,
  MakeTwitMutation,
  MakeTwitMutationVariables,
  MakeTwitDocument,
  LikeTwitMutation,
  LikeTwitMutationVariables,
  LikeTwitDocument,
  UnlikeTwitMutation,
  UnlikeTwitMutationVariables,
  UnlikeTwitDocument,
  MyTwitListQueryVariables,
  MyTwitListQuery,
  MyTwitListDocument,
  HashtagTwitListQueryVariables,
  HashtagTwitListQuery,
  HashtagTwitListDocument,
  UserTwitListQueryVariables,
  UserTwitListQuery,
  UserTwitListDocument,
  LikedTwitListQueryVariables,
  LikedTwitListQuery,
  LikedTwitListDocument,
  UserByNameQueryVariables,
  UserByNameQuery,
  UserByNameDocument,
  MyFeedListDocument,
  MyFeedListQuery,
  MyFeedListQueryVariables,
} from "common/graphql.generated"
import * as Urql from "urql"
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export function useLoggedInUserQuery(
  options: Omit<Urql.UseQueryArgs<LoggedInUserQueryVariables>, "query"> = {},
) {
  return Urql.useQuery<LoggedInUserQuery>({
    query: LoggedInUserDocument,
    ...options,
  })
}

export function useFollowUserMutation() {
  return Urql.useMutation<FollowUserMutation, FollowUserMutationVariables>(
    FollowUserDocument,
  )
}

export function useUnfollowUserMutation() {
  return Urql.useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(
    UnfollowUserDocument,
  )
}

export function useFollowerListQuery(
  options: Omit<Urql.UseQueryArgs<FollowerListQueryVariables>, "query"> = {},
) {
  return Urql.useQuery<FollowerListQuery>({
    query: FollowerListDocument,
    ...options,
  })
}

export function useFolloweeListQuery(
  options: Omit<Urql.UseQueryArgs<FolloweeListQueryVariables>, "query"> = {},
) {
  return Urql.useQuery<FolloweeListQuery>({
    query: FolloweeListDocument,
    ...options,
  })
}

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument)
}

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
  )
}

export function useMakeTwitMutation() {
  return Urql.useMutation<MakeTwitMutation, MakeTwitMutationVariables>(
    MakeTwitDocument,
  )
}

export function useLikeTwitMutation() {
  return Urql.useMutation<LikeTwitMutation, LikeTwitMutationVariables>(
    LikeTwitDocument,
  )
}

export function useUnlikeTwitMutation() {
  return Urql.useMutation<UnlikeTwitMutation, UnlikeTwitMutationVariables>(
    UnlikeTwitDocument,
  )
}

export function useMyTwitListQuery(
  options: Omit<Urql.UseQueryArgs<MyTwitListQueryVariables>, "query"> = {},
) {
  return Urql.useQuery<MyTwitListQuery>({
    query: MyTwitListDocument,
    ...options,
  })
}

export function useMyFeedListQuery(
  options: Omit<Urql.UseQueryArgs<MyFeedListQueryVariables>, "query"> = {},
) {
  return Urql.useQuery<MyFeedListQuery>({
    query: MyFeedListDocument,
    ...options,
  })
}

export function useHashtagTwitListQuery(
  options: Omit<Urql.UseQueryArgs<HashtagTwitListQueryVariables>, "query"> = {},
) {
  return Urql.useQuery<HashtagTwitListQuery>({
    query: HashtagTwitListDocument,
    ...options,
  })
}

export function useUserTwitListQuery(
  options: Omit<Urql.UseQueryArgs<UserTwitListQueryVariables>, "query"> = {},
) {
  return Urql.useQuery<UserTwitListQuery>({
    query: UserTwitListDocument,
    ...options,
  })
}

export function useLikedTwitListQuery(
  options: Omit<Urql.UseQueryArgs<LikedTwitListQueryVariables>, "query"> = {},
) {
  return Urql.useQuery<LikedTwitListQuery>({
    query: LikedTwitListDocument,
    ...options,
  })
}

export function useUserByNameQuery(
  options: Omit<Urql.UseQueryArgs<UserByNameQueryVariables>, "query"> = {},
) {
  return Urql.useQuery<UserByNameQuery>({
    query: UserByNameDocument,
    ...options,
  })
}
