import { AppContext } from "context"
import { db, dc } from "database"
import { t } from "schema/typesFactory"
import { UserType } from "schema/user"
import { isDatabaseError } from "zapatos/db"
import { Follow as QFollow } from "zapatos/schema"

export { Follow as QFollow } from "zapatos/schema"
export type Follow = QFollow.JSONSelectable & { _type?: "Follow" }

export const mutationFollowUser = t.field("followUser", {
  type: t.List(t.NonNull(UserType)),
  args: { id: t.arg(t.NonNullInput(t.ID)) },
  resolve: (_, { id }, ctx) => changeFollowState(true, id, ctx),
})

export const mutationUnfollowUser = t.field("unfollowUser", {
  type: t.List(t.NonNull(UserType)),
  args: { id: t.arg(t.NonNullInput(t.ID)) },
  resolve: (_, { id }, ctx) => changeFollowState(false, id, ctx),
})

const changeFollowState = async (
  state: boolean,
  id: string,
  { pool, auth }: AppContext,
) => {
  if (!auth.id) return null
  const followeeId = Number(id)
  const followerId = auth.id

  const users = await db
    .select("User", { id: dc.isIn([followerId, followeeId]) })
    .run(pool)

  if (followeeId === followerId || users.length !== 2) return

  try {
    await (state ? db.insert : db.deletes)("Follow", {
      followerId,
      followeeId,
    }).run(pool)
  } catch (error) {
    if (!isDatabaseError(error, "IntegrityConstraintViolation_UniqueViolation"))
      throw error
  }

  return users
}
