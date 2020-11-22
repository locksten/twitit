import { db } from "database"
import { QFollow } from "schema/follow"
import { QTwit, Twit, TwitType } from "schema/twit"
import { t } from "schema/typesFactory"
import { UserType } from "schema/user"

export type Me = { id: number }

export const MeType = t.objectType<Me>({
  name: "Me",
  fields: () => [
    t.field("user", {
      type: t.NonNull(UserType),
      resolve: async (me, _args, { pool }) => {
        return await db.selectExactlyOne("User", { id: me.id }).run(pool)
      },
    }),
    t.field("feed", {
      type: t.NonNull(t.List(t.NonNull(TwitType))),
      resolve: async (me, _args, { pool }) => {
        return await db.sql<QFollow.SQL | QTwit.SQL, Twit[]>`
            SELECT ${"Twit"}.*
            FROM ${"Follow"}
            JOIN ${"Twit"} ON ${"Follow"}.${"followeeId"} = ${"Twit"}.${"authorId"}
            WHERE ${"followerId"} = ${db.param(me.id)}`.run(pool)
      },
    }),
  ],
})

export const queryMe = t.field("me", {
  type: MeType,
  resolve: () => {
    return { id: 1 }
  },
})
