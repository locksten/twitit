import { useRoutes } from "react-router-dom"

export const useRelativeMatch = (path: string) =>
  useRoutes([{ path: `:path` }])?.props.value.params["path"] === path
