import { Pool } from "pg"

type BatchLoadFn<V, K = number> = (
  pool: Pool,
  // ) => (keys: ReadonlyArray<K>) => PromiseLike<ArrayLike<V | Error>>
) => (keys: K[]) => PromiseLike<ArrayLike<V | Error>>

// const batchUser: BatchLoadFn<User> = (pool) => (ids) => {
//   return db
//   console
//     .log("by ids", ids)
//     .select("User", {
//       id: dc.isIn(ids),
//     })
//     .run(pool)
// }

export const newDataLoaders = (pool: Pool) => ({
  // user: new DataLoader(batchUser(pool)),
})
