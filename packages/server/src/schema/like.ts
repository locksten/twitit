import { AppContext } from "context"
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
  resolve: (_, { id }, ctx) => changeLikeState(true, id, ctx),
})

export const mutationUnlikeTwit = t.field("unlikeTwit", {
  type: TwitType,
  args: { id: t.arg(t.NonNullInput(t.ID)) },
  resolve: (_, { id }, ctx) => changeLikeState(false, id, ctx),
})

const changeLikeState = async (
  state: boolean,
  id: string,
  { pool, auth }: AppContext,
) => {
  if (!auth.id) return null

  const twit = await db.selectOne("Twit", { id: Number(id) }).run(pool)
  if (!twit || twit.authorId === auth.id) return null

  try {
    await (state ? db.insert : db.deletes)("Like", {
      twitId: twit.id,
      userId: auth.id,
    }).run(pool)
  } catch (error) {
    if (!isDatabaseError(error, "IntegrityConstraintViolation_UniqueViolation"))
      throw error
  }

  return twit
}
