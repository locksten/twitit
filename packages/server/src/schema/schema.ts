import { buildGraphQLSchema } from "gqtx"
import { mutationLogin } from "schema/auth/login"
import { mutationRegister } from "schema/auth/register"
import { queryHashtagById, queryHashtagSearch } from "schema/hashtag"
import { mutationLikeTwit } from "schema/like"
import { queryMe } from "schema/me"
import { mutationMakeTwit, queryTwitById } from "schema/twit"
import { t } from "schema/typesFactory"
import { queryUserById, queryUserSearch } from "schema/user"

const query = t.queryType({
  fields: [
    queryMe,
    queryUserById,
    queryUserSearch,
    queryTwitById,
    queryHashtagById,
    queryHashtagSearch,
  ],
})

const mutation = t.mutationType({
  fields: () => [
    mutationRegister,
    mutationLogin,
    mutationMakeTwit,
    mutationLikeTwit,
  ],
})

export const schema = buildGraphQLSchema({
  query,
  mutation,
})
