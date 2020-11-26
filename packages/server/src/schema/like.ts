import { db } from "database"
import { TwitType } from "schema/twit"
import { t } from "schema/typesFactory"
import { isDatabaseError } from "zapatos/db"
import { Like as QLike } from "zapatos/schema"

export { Like as QLike } from "zapatos/schema"
export type Like = QLike.JSONSelectable & { _type?: "Like" }

export const mutationLikeTwit = t.field("likeTwit", {
  type: TwitType,
  args: { id: t.arg(t.NonNullInput(t.ID)) },
  resolve: async (_, { id }, { pool, auth }) => {
    if (!auth.id) return null

    const twit = await db.selectOne("Twit", { id: Number(id) }).run(pool)
    if (!twit || twit.authorId === auth.id) return null

    try {
      await db.insert("Like", { twitId: twit.id, userId: auth.id }).run(pool)
    } catch (error) {
      if (
        !isDatabaseError(error, "IntegrityConstraintViolation_UniqueViolation")
      )
        throw error
    }

    return twit
  },
})
