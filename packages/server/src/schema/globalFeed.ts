import { db } from "database"
import { TwitType } from "schema/twit"
import { t } from "schema/typesFactory"

export const queryGlobalFeed = t.field("globalFeed", {
  type: t.NonNull(t.List(t.NonNull(TwitType))),
  resolve: async (_me, _args, { pool }) => {
    return await db
      .select("Twit", db.all, {
        order: { by: "createdAt", direction: "DESC" },
        limit: 50,
      })
      .run(pool)
  },
})
