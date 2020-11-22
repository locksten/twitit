import { db } from "database"
import { idResolver, t } from "schema/typesFactory"
import { UserType } from "schema/user"
import { Twit as QTwit } from "zapatos/schema"

export { Twit as QTwit } from "zapatos/schema"
export type Twit = QTwit.JSONSelectable

export const TwitType = t.objectType<Twit>({
  name: "Twit",
  description: "A Twit",
  fields: () => [
    idResolver,
    t.defaultField("text", t.NonNull(t.String)),
    t.defaultField("createdAt", t.NonNull(t.String)),
    t.field("author", {
      type: t.NonNull(UserType),
      resolve: async (twit, _args, { pool }) => {
        return await db
          .selectExactlyOne("User", { id: twit.authorId })
          .run(pool)
      },
    }),
  ],
})

export const queryTwitById = t.field("twitById", {
  type: TwitType,
  args: {
    id: t.arg(t.NonNullInput(t.ID)),
  },
  resolve: async (_, { id }, { pool }) => {
    return await db.selectOne("Twit", { id: Number(id) }).run(pool)
  },
})
