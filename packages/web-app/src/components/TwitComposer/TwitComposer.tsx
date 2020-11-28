/** @jsxImportSource @emotion/react */
import { useMakeTwitMutation } from "common/urql.generated"
import { _TwitFragments } from "components/Twit"
import gql from "graphql-tag"
import React, { FC } from "react"
import { useForm } from "react-hook-form"
import "twin.macro"

type Inputs = {
  text: string
}

export const TwitComposer: FC<{}> = ({ ...props }) => {
  const [_, makeTwit] = useMakeTwitMutation()
  const { register, handleSubmit, reset } = useForm<Inputs>()

  return (
    <div {...props}>
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
          placeholder={`Twit`}
          tw="h-8 rounded-md border border-gray-300 px-2"
        />
      </form>
    </div>
  )
}

const MakeTwit = gql`
  mutation makeTwit($text: String!) {
    makeTwit(text: $text) {
      id
      ...Twit
    }
  }
  ${_TwitFragments}
`
