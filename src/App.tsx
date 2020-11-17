import { css, GlobalStyles } from "twin.macro"
import React from "react"
import { Twit } from "components/Twit"

const App = () => {
  return (
    <React.Fragment>
      <GlobalStyles />
      <Twit title="title" />
    </React.Fragment>
  )
}

export default App
