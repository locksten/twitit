/** @jsxImportSource @emotion/react */
import { Twit, _TwitFragments } from "components/Twit"
import gql from "graphql-tag"
import React, { FC } from "react"
import { useForm } from "react-hook-form"
import "twin.macro"
import { useMakeTwitMutation, useMyTwitListQuery } from "urql.generated"

type Inputs = {
  text: string
}

export const TwitList: FC<{}> = ({ ...props }) => {
  const [{ data }] = useMyTwitListQuery()
  const twits = data?.userById?.twits

  const [_, makeTwit] = useMakeTwitMutation()

  const { register, handleSubmit, reset } = useForm<Inputs>()

  return (
    <div tw="p-3" {...props}>
      <div tw="my-4 max-w-xl mx-auto grid">
        <form
          onSubmit={handleSubmit<Inputs>((text) => {
            makeTwit(text)
            reset()
          })}
          tw="grid"
        >
          <input
            name="text"
            ref={register({ required: true })}
            size={10}
            placeholder="Twit"
            tw="h-8 rounded-md border border-gray-300 px-2"
          />
        </form>
        {twits?.map((twit) => (
          <div key={twit.id} tw="border-b border-gray-200">
            <Twit fragment={twit} />
          </div>
        ))}
      </div>
    </div>
  )
}

export const _MyTwitListQuery = gql`
  query MyTwitList {
    userById(id: "26") {
      id
      username
      twits {
        id
        createdAt
        ...Twit
      }
    }
  }
  ${_TwitFragments}
`

const MakeTwit = gql`
  mutation makeTwit($text: String!) {
    makeTwit(text: $text) {
      id
      createdAt
      ...Twit
    }
  }
  ${_TwitFragments}
`
