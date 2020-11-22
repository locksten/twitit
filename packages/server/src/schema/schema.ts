import { buildGraphQLSchema } from "gqtx"
import { queryMe } from "schema/me"
import { queryTwitById } from "schema/twit"
import { t } from "schema/typesFactory"
import { queryUserById, queryUserSearch } from "schema/user"

const Query = t.queryType({
  fields: [queryMe, queryUserById, queryUserSearch, queryTwitById],
})

export const schema = buildGraphQLSchema({
  query: Query,
})
