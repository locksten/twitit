/** @jsxImportSource @emotion/react */
import { useAuth } from "common/authContext"
import { useLoginMutation } from "common/urql.generated"
import { PrimaryButton } from "components/PrimaryButton"
import { TextField } from "components/TextField"
import gql from "graphql-tag"
import React, { FC } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import "twin.macro"

type Inputs = {
  username: string
  password: string
}

export const Login: FC<{}> = ({ ...props }) => {
  const { logIn } = useAuth()
  const [{ data }, login] = useLoginMutation()
  const { register, handleSubmit, reset } = useForm<Inputs>()
  const navigate = useNavigate()

  return (
    <div tw="py-16" {...props}>
      <form
        tw="grid gap-4"
        onSubmit={handleSubmit<Inputs>(async (info) => {
          const res = await login(info)
          const loginResult = res.data?.login
          if (loginResult?.__typename === "SuccessfulLoginResult") {
            navigate(`/feed`)
            logIn({ accessToken: loginResult.authTokens.accessToken })
            reset()
          }
        })}
      >
        <div tw="grid gap-2">
          <TextField
            name="username"
            ref={register({ required: true })}
            placeholder="Username"
            autocomplete
          />
          <TextField
            name="password"
            ref={register({ required: true })}
            type="password"
            placeholder="Password"
          />
        </div>
        <PrimaryButton text="Log in" type="submitButton" />
        {data?.login.__typename === "FailedLoginResult" && (
          <div tw="rounded-md bg-red-200 text-red-800 py-2 text-center shadow-md">
            {data.login.reason}
          </div>
        )}
      </form>
    </div>
  )
}

const _Login = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ... on SuccessfulLoginResult {
        _type
        user {
          _type
          id
          username
        }
        authTokens {
          _type
          accessToken
        }
      }
      ... on FailedLoginResult {
        _type
        reason
      }
    }
  }
`
