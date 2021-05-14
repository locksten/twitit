/** @jsxImportSource @emotion/react */
import { AuthSegment } from "components/AuthSegment"
import { NavButton } from "components/NavButton"
import { Search } from "components/Search"
import { TextField } from "components/TextField"
import React, { FC } from "react"
import "twin.macro"
import tw, { css, styled } from "twin.macro"

const Favorites = styled.div(
  () => css`
    ${tw`grid grid-flow-col gap-2 py-2 overflow-auto`}
    ${css`
      ::-webkit-scrollbar {
        display: none;
      }
      -ms-overflow-style: none;
      scrollbar-width: none;
    `}
  `,
)

export const MainNavbar: FC<{}> = ({ ...props }) => {
  return (
    <nav tw="grid gap-2" {...props}>
      <AuthSegment tw="sm:hidden py-2 px-4" fullWidth />
      <div tw="flex justify-between px-4 overflow-hidden">
        <Favorites>
          <Search />
          <NavButton to="/hashtag/react/twit" text="#react" />
          <NavButton to="/hashtag/graphql/twit" text="#graphql" />
          <NavButton to="/hashtag/typescript/twit" text="#typesrcipt" />
          <NavButton to="/hashtag/node/twit" text="#node" />
          <NavButton
            to="/user/alice/twit"
            absoluteMatch="user/alice/*"
            text="@alice"
          />
          <NavButton
            to="/user/bob/twit"
            absoluteMatch="user/bob/*"
            text="@bob"
          />
          <NavButton
            to="/user/charlie/twit"
            absoluteMatch="user/charlie/*"
            text="@charlie"
          />
          <NavButton
            to="/user/eve/twit"
            absoluteMatch="user/eve/*"
            text="@eve"
          />
        </Favorites>
        <AuthSegment tw="py-2 pl-6 hidden sm:block" />
      </div>
    </nav>
  )
}
