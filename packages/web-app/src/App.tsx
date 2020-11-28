/** @jsxImportSource @emotion/react */
import { useAuthProvider } from "common/authContext"
import { AppRouter } from "components/AppRouter"
import { UrqlProvider } from "components/UrqlProvider"
import React, { Fragment } from "react"
import { GlobalStyles } from "twin.macro"

const App = () => {
  const { AuthContextProvider } = useAuthProvider()
  return (
    <Fragment>
      <AuthContextProvider>
        <UrqlProvider>
          <GlobalStyles />
          <AppRouter />
        </UrqlProvider>
      </AuthContextProvider>
    </Fragment>
  )
}

export default App
