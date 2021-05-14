/** @jsxImportSource @emotion/react */
import { useAuth } from "common/authContext"
import { RegistrationResult, LoginResult } from "common/graphql.generated"
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

  const [latestErrorReason, setLatestErrorReason] =
    useState<string | undefined>(undefined)

  const handleSubmition = (result?: RegistrationResult | LoginResult) => {
    if (result?.__typename === "SuccessfulLoginResult") {
      navigate(`/user/${result.user.username}/twit`)
      logIn({ accessToken: result.authTokens.accessToken })
      reset()
    } else if (
      result?.__typename === "FailedLoginResult" ||
      result?.__typename === "FailedRegistrationResult"
    ) {
      setLatestErrorReason(result.reason)
    }
  }

  const { register: registerInput, handleSubmit, reset } = useForm<Inputs>()

  const navigate = useNavigate()

  return (
    <div tw="py-16" {...props}>
      <form
        tw="grid gap-4"
        onSubmit={handleSubmit<Inputs>(async (info) =>
          handleSubmition(
            (await login(info)).data?.login as RegistrationResult,
          ),
        )}
      >
        <div tw="grid gap-2">
          <TextField
            name="username"
            ref={registerInput({ required: true })}
            placeholder="Username"
            autocomplete
            autoFocus
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
            onClick={handleSubmit<Inputs>(async (info) =>
              handleSubmition(
                (await register(info)).data?.register as RegistrationResult,
              ),
            )}
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

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
