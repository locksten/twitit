import { AppContext } from "context"
import { db, dc } from "database"
import { ObjectType } from "gqtx/dist/types"
import { DateType } from "schema/date"
import { QFollow } from "schema/follow"
import { TwitType } from "schema/twit"
import { idResolver, t, typeResolver } from "schema/typesFactory"
import { User as QUser } from "zapatos/schema"

export { User as QUser } from "zapatos/schema"
export type User = QUser.JSONSelectable & { _type?: "User" }

export const UserType: ObjectType<AppContext, User | null> = t.objectType<User>(
  {
    name: "User",
    fields: () => [
      idResolver,
      typeResolver("User"),
      t.defaultField("username", t.NonNull(t.String)),
      t.defaultField("createdAt", t.NonNull(DateType)),
      t.field("followers", {
        type: t.NonNull(t.List(t.NonNull(UserType))),
        resolve: async (user, _args, { pool }) => {
          return await db.sql<QFollow.SQL | QUser.SQL, User[]>`
            SELECT ${"User"}.*
            FROM ${"Follow"}
            JOIN ${"User"} ON ${"Follow"}.${"followerId"} = ${"User"}.${"id"}
            WHERE ${"followeeId"} = ${db.param(user.id)}`.run(pool)
        },
      }),
      t.field("followerCount", {
        type: t.NonNull(t.Int),
        resolve: async (user, _args, { pool }) => {
          return await db.count("Follow", { followeeId: user.id }).run(pool)
        },
      }),
      t.field("followees", {
        type: t.NonNull(t.List(t.NonNull(UserType))),
        resolve: async (user, _args, { pool }) => {
          return await db.sql<QFollow.SQL | QUser.SQL, User[]>`
            SELECT ${"User"}.*
            FROM ${"Follow"}
            JOIN ${"User"} ON ${"Follow"}.${"followeeId"} = ${"User"}.${"id"}
            WHERE ${"followerId"} = ${db.param(user.id)}`.run(pool)
        },
      }),
      t.field("followeeCount", {
        type: t.NonNull(t.Int),
        resolve: async (user, _args, { pool }) => {
          return await db.count("Follow", { followerId: user.id }).run(pool)
        },
      }),
      t.field("twits", {
        type: t.NonNull(t.List(t.NonNull(TwitType))),
        resolve: async (user, _args, { pool }) => {
          return await db
            .select(
              "Twit",
              { authorId: user.id },
              { order: { by: "createdAt", direction: "DESC" } },
            )
            .run(pool)
        },
      }),
    ],
  },
)

export const queryUserById = t.field("userById", {
  type: UserType,
  args: {
    id: t.arg(t.NonNullInput(t.ID)),
  },
  resolve: async (_, { id }, { pool }) => {
    return await db.selectOne("User", { id: Number(id) }).run(pool)
  },
})

export const queryUserSearch = t.field("userSearch", {
  type: t.NonNull(t.List(t.NonNull(UserType))),
  args: {
    searchTerm: t.arg(t.NonNullInput(t.String)),
  },
  resolve: async (_, { searchTerm }, { pool }) => {
    return await db
      .select("User", { username: dc.like("%" + searchTerm + "%") })
      .run(pool)
  },
})
