import { t } from "schema/typesFactory"

export const DateType = t.scalarType<string>({
  name: "Date",
  parseValue: (value) => {
    return (value as unknown) as string
  },
  serialize: (value) => {
    return value
  },
  parseLiteral: (node) => (node.kind === "StringValue" ? node.value : null),
})
