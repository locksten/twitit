import { db, dc } from "database"
import { ObjectType } from "gqtx/dist/types"
import { Pool } from "pg"
import { QTwit, Twit, TwitType } from "schema/twit"
import { QTwitHashtag } from "schema/twitHashtag"
import { idResolver, t, typeResolver } from "schema/typesFactory"
import { isDatabaseError } from "zapatos/db"
import { Hashtag as QHashtag } from "zapatos/schema"

export { Hashtag as QHashtag } from "zapatos/schema"
export type Hashtag = QHashtag.JSONSelectable & { _type?: "Hashtag" }

export const HashtagType: ObjectType<any, Hashtag | null> = t.objectType<
  Hashtag
>({
  name: "Hashtag",
  fields: () => [
    idResolver,
    typeResolver("Hashtag"),
    t.defaultField("text", t.NonNull(t.String)),
    t.field("twits", {
      type: t.NonNull(t.List(t.NonNull(TwitType))),
      resolve: async (hashtag, _args, { pool }) => {
        return await db.sql<QTwitHashtag.SQL | QTwit.SQL, Twit[]>`
          SELECT *
          FROM ${"Twit_Hashtag"}
          JOIN ${"Twit"} ON ${"Twit_Hashtag"}.${"twitId"} = ${"Twit"}.${"id"}
          WHERE ${{ hashtagId: hashtag.id }}`.run(pool)
      },
    }),
  ],
})

export const queryHashtagById = t.field("hashtagById", {
  type: HashtagType,
  args: {
    id: t.arg(t.NonNullInput(t.ID)),
  },
  resolve: async (_, { id }, { pool }) => {
    return await db.selectOne("Hashtag", { id: Number(id) }).run(pool)
  },
})

export const queryHashtagByText = t.field("hashtagByText", {
  type: HashtagType,
  args: {
    text: t.arg(t.NonNullInput(t.String)),
  },
  resolve: async (_, { text }, { pool }) => {
    return await db.selectOne("Hashtag", { text }).run(pool)
  },
})

export const queryHashtagSearch = t.field("hashtagSearch", {
  type: t.NonNull(t.List(t.NonNull(HashtagType))),
  args: {
    searchTerm: t.arg(t.NonNullInput(t.String)),
  },
  resolve: async (_, { searchTerm }, { pool }) => {
    return await db
      .select("Hashtag", { text: dc.like("%" + searchTerm + "%") })
      .run(pool)
  },
})

export const createHashtags = async (pool: Pool, hashtags: string[]) => {
  try {
    hashtags.forEach(
      async (t) => await db.insert("Hashtag", { text: t }).run(pool),
    )
  } catch (error) {
    if (!isDatabaseError(error, "IntegrityConstraintViolation_UniqueViolation"))
      throw error
  }
  return await db.select("Hashtag", { text: dc.isIn(hashtags) }).run(pool)
}

export const extractHashtags = (text: string): string[] =>
  text?.match(/#([a-z0-9]+)/gi)?.map((tag) => tag.substring(1)) || []
