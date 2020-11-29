/** @jsxImportSource @emotion/react */
import { useAuth } from "common/authContext"
import { useLoginMutation, useRegisterMutation } from "common/urql.generated"
import { PrimaryButton } from "components/PrimaryButton"
import { SecondaryButton } from "components/SecondaryButton"
import { TextField } from "components/TextField"
import gql from "graphql-tag"
import React, { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import "twin.macro"

type Inputs = {
  username: string
  password: string
}

export const Login: FC<{}> = ({ ...props }) => {
  const { logIn } = useAuth()

  const login = useLoginMutation()[1]
  const register = useRegisterMutation()[1]

  const [latestErrorReason, setLatestErrorReason] = useState<
    string | undefined
  >(undefined)

  const { register: registerInput, handleSubmit, reset } = useForm<Inputs>()

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
          } else if (loginResult?.__typename === "FailedLoginResult") {
            setLatestErrorReason(loginResult.reason)
          }
        })}
      >
        <div tw="grid gap-2">
          <TextField
            name="username"
            ref={registerInput({ required: true })}
            placeholder="Username"
            autocomplete
          />
          <TextField
            name="password"
            ref={registerInput({ required: true })}
            type="password"
            placeholder="Password"
          />
        </div>
        <div tw="grid grid-flow-col gap-2">
          <SecondaryButton
            text="Register"
            onClick={handleSubmit<Inputs>(async (info) => {
              const res = await register(info)
              const registerResult = res.data?.register
              if (registerResult?.__typename === "SuccessfulLoginResult") {
                navigate(`/feed`)
                logIn({ accessToken: registerResult.authTokens.accessToken })
                reset()
              } else if (
                registerResult?.__typename === "FailedRegistrationResult"
              ) {
                setLatestErrorReason(registerResult.reason)
              }
            })}
          />
          <PrimaryButton text="Log in" type="submitButton" />
        </div>
        {latestErrorReason && (
          <div tw="rounded-md bg-red-200 text-red-800 py-2 text-center shadow-md">
            {latestErrorReason}
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

const _Register = gql`
  mutation register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      ... on SuccessfulLoginResult {
        user {
          id
          username
        }
        authTokens {
          accessToken
        }
      }
      ... on FailedRegistrationResult {
        _type
        reason
      }
    }
  }
`
