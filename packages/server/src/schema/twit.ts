import { db } from "database"
import { DateType } from "schema/date"
import {
  createHashtags,
  extractHashtags,
  Hashtag,
  HashtagType,
  QHashtag,
} from "schema/hashtag"
import { QTwitHashtag } from "schema/twitHashtag"
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
    t.field("hashtags", {
      type: t.NonNull(t.List(t.NonNull(HashtagType))),
      resolve: async (twit, _args, { pool }) => {
        return await db.sql<QTwitHashtag.SQL | QHashtag.SQL, Hashtag[]>`
          SELECT ${"Hashtag"}.*
          FROM ${"Twit_Hashtag"}
          JOIN ${"Hashtag"} ON ${"Twit_Hashtag"}.${"hashtagId"} = ${"Hashtag"}.${"id"}
          WHERE ${{ twitId: twit.id }}`.run(pool)
      },
    }),
    t.field("likeCount", {
      type: t.NonNull(t.Int),
      resolve: async (twit, _args, { pool }) => {
        return await db.count("Like", { twitId: twit.id }).run(pool)
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

    const twit = await db.insert("Twit", { authorId: auth.id, text }).run(pool)

    const hashtags = await createHashtags(pool, extractHashtags(text))

    await db
      .insert(
        "Twit_Hashtag",
        hashtags.map((hashtag) => ({
          twitId: twit.id,
          hashtagId: hashtag.id,
        })),
      )
      .run(pool)

    return twit
  },
})
