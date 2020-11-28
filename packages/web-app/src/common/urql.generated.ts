import {
  LoggedInUserQueryVariables,
  LoggedInUserQuery,
  LoggedInUserDocument,
  LoginMutation,
  LoginMutationVariables,
  LoginDocument,
  LikeTwitMutation,
  LikeTwitMutationVariables,
  LikeTwitDocument,
  MakeTwitMutation,
  MakeTwitMutationVariables,
  MakeTwitDocument,
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
  UnlikeTwitDocument,
  UnlikeTwitMutation,
  UnlikeTwitMutationVariables,
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

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument)
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

export function useMakeTwitMutation() {
  return Urql.useMutation<MakeTwitMutation, MakeTwitMutationVariables>(
    MakeTwitDocument,
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
