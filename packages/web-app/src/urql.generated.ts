import * as Operations from "graphql.generated"
import * as Urql from "urql"
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export function useMyTwitListQuery(
  options: Omit<
    Urql.UseQueryArgs<Operations.MyTwitListQueryVariables>,
    "query"
  > = {},
) {
  return Urql.useQuery<Operations.MyTwitListQuery>({
    query: Operations.MyTwitListDocument,
    ...options,
  })
}

export function useMakeTwitMutation() {
  return Urql.useMutation<
    Operations.MakeTwitMutation,
    Operations.MakeTwitMutationVariables
  >(Operations.MakeTwitDocument)
}
