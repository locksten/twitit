import { buildGraphQLSchema } from "gqtx"
import { mutationLogin } from "schema/auth/login"
import { mutationRegister } from "schema/auth/register"
import { queryMe } from "schema/me"
import { mutationMakeTwit, queryTwitById } from "schema/twit"
import { t } from "schema/typesFactory"
import { queryUserById, queryUserSearch } from "schema/user"

const query = t.queryType({
  fields: [queryMe, queryUserById, queryUserSearch, queryTwitById],
})

const mutation = t.mutationType({
  fields: () => [mutationRegister, mutationLogin, mutationMakeTwit],
})

export const schema = buildGraphQLSchema({
  query,
  mutation,
})
