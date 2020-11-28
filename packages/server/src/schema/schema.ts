import { buildGraphQLSchema } from "gqtx"
import { mutationLogin } from "schema/auth/login"
import { mutationRegister } from "schema/auth/register"
import {
  queryHashtagById,
  queryHashtagByText,
  queryHashtagSearch,
} from "schema/hashtag"
import { mutationLikeTwit, mutationUnlikeTwit } from "schema/like"
import { queryMe } from "schema/me"
import { mutationMakeTwit, queryTwitById } from "schema/twit"
import { t } from "schema/typesFactory"
import { queryUserById, queryUserByName, queryUserSearch } from "schema/user"

const query = t.queryType({
  fields: [
    queryMe,
    queryUserById,
    queryUserByName,
    queryUserSearch,
    queryTwitById,
    queryHashtagById,
    queryHashtagByText,
    queryHashtagSearch,
  ],
})

const mutation = t.mutationType({
  fields: () => [
    mutationRegister,
    mutationLogin,
    mutationMakeTwit,
    mutationLikeTwit,
    mutationUnlikeTwit,
  ],
})

export const schema = buildGraphQLSchema({
  query,
  mutation,
})
