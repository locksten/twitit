/** @jsxImportSource @emotion/react */
import { MainNavbar } from "components/MainNavbar"
import { Twit } from "components/Twit"
import { UserNavbar } from "components/UserNavbar"
import React, { Fragment } from "react"
import { GlobalStyles } from "twin.macro"

const App = () => {
  return (
    <Fragment>
      <GlobalStyles />
      <MainNavbar />
      <div>
        <div tw="my-4 max-w-xl mx-auto grid">
          <UserNavbar />
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} tw="border-b border-gray-200">
              <Twit
                username="glados"
                text="This was a triumph. I'm making a note here. Huge Suces. It's hard to overstate my satisfaction."
              />
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  )
}

export default App
