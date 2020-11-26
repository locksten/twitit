import { db } from "database"
import { DateType } from "schema/date"
import { idResolver, t, typeResolver } from "schema/typesFactory"
import { UserType } from "schema/user"
import { Twit as QTwit } from "zapatos/schema"

export { Twit as QTwit } from "zapatos/schema"
export type Twit = QTwit.JSONSelectable & { _type?: "Twit" }

export const TwitType = t.objectType<Twit>({
  name: "Twit",
  description: "A Twit",
  fields: () => [
    idResolver,
    typeResolver("Twit"),
    t.defaultField("text", t.NonNull(t.String)),
    t.defaultField("createdAt", t.NonNull(DateType)),
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

export const mutationMakeTwit = t.field("makeTwit", {
  type: TwitType,
  args: { text: t.arg(t.NonNullInput(t.String)) },
  resolve: async (_, { text }, { pool, auth }) => {
    if (!auth.id) return null
    return await db
      .insert("Twit", {
        authorId: auth.id,
        text,
      })
      .run(pool)
  },
})
