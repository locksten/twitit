/** @jsxImportSource @emotion/react */
import { MainNavbar } from "components/MainNavbar"
import { TwitList } from "components/TwitList"
import React, { Fragment } from "react"
import { GlobalStyles } from "twin.macro"
import { createClient, Provider as UrqlProvider } from "urql"

const client = createClient({
  url: "http://localhost:4000/graphql",
  requestPolicy: "cache-and-network",
  fetchOptions: {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYsImlhdCI6MTYwNjM1NjQwOCwiZXhwIjoxNjA2OTYxMjA4fQ.TekGrkxGWgZ5_sil0-D63F3Nvtav9mn6Tnrij2fLmSU",
    },
  },
})

const App = () => {
  return (
    <Fragment>
      <UrqlProvider value={client}>
        <GlobalStyles />
        <MainNavbar />
        <TwitList />
      </UrqlProvider>
    </Fragment>
  )
}

export default App
