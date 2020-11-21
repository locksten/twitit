import { AppContext } from "context"
import { createTypesFactory } from "gqtx"

export const t = createTypesFactory<AppContext>()

export const idResolver = t.field<{ id: number }, any, any>("id", {
  type: t.ID,
  resolve: ({ id }) => {
    return String(id)
  },
})
