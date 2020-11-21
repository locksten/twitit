import { buildGraphQLSchema } from "gqtx"
import { t } from "schema/typesFactory"
import { UserType } from "schema/user"
import * as db from "zapatos/db"

const Query = t.queryType({
  fields: [
    t.field("me", {
      type: UserType,
      resolve: async (_, _args, { pool }) => {
        return await db.selectOne("User", { id: 1 }).run(pool)
      },
    }),
    t.field("userById", {
      type: UserType,
      args: {
        id: t.arg(t.NonNullInput(t.ID)),
      },
      resolve: async (_, { id }, { pool }) => {
        return await db.selectOne("User", { id: Number(id) }).run(pool)
      },
    }),
  ],
})

export const schema = buildGraphQLSchema({
  query: Query,
})
