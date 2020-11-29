/** @jsxImportSource @emotion/react */
import { FollowList } from "components/FollowList"
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
      <div tw="max-w-xl mx-auto px-4">
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="feed" element={<TwitList type="feed" param="" />} />
          <Route path="user/:username/*" element={<UserSection />}>
            <Route
              path="twit"
              element={<TwitList type="user" param="username" />}
            />
            {/* <Route
              path="mention"
              element={
                <div>
                  Mentions
                </div>
              }
            /> */}
            <Route
              path="like"
              element={<TwitList type="liked" param="username" />}
            />
            <Route
              path="follower"
              element={<FollowList type="follower" param="username" />}
            />
            <Route
              path="following"
              element={<FollowList type="following" param="username" />}
            />
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
