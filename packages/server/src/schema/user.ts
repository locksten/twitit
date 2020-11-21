import { idResolver, t } from "schema/typesFactory"
import { User } from "zapatos/schema"

export type User = User.Selectable

export const UserType = t.objectType<User>({
  name: "User",
  description: "A User",
  fields: () => [
    idResolver,
    t.defaultField("name", t.NonNull(t.String)),
    t.field("extra", {
      type: t.String,
      resolve: (_user, _args, { pool }) => {
        console.log("EXTRA")
        return "test"
      },
    }),
  ],
})
