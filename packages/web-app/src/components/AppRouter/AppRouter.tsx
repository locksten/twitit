/** @jsxImportSource @emotion/react */
import { Login } from "components/Login"
import { MainNavbar } from "components/MainNavbar"
import { TwitList } from "components/TwitList"
import { UserSection } from "components/UserSection"
import React, { FC } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "twin.macro"

export const AppRouter: FC = () => {
  return (
    <BrowserRouter>
      <MainNavbar />
      <div tw="max-w-xl mx-auto">
        <Routes>
          <Route path="login" element={<Login />} />
          <Route
            path="feed"
            element={
              <div>
                feed
                <TwitList type="user" param="username" />
              </div>
            }
          />
          <Route path="user/:username/*" element={<UserSection />}>
            <Route
              path="twit"
              element={<TwitList type="user" param="username" />}
            />
            <Route
              path="mention"
              element={
                <div>
                  mention
                  <TwitList type="user" param="username" />
                </div>
              }
            />
            <Route
              path="like"
              element={<TwitList type="liked" param="username" />}
            />
            <Route path="follower" element={<div>followers</div>} />
            <Route path="follow" element={<div>follows</div>} />
          </Route>
          <Route
            path="hashtag/:text/twit"
            element={<TwitList type="hashtag" param="text" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
