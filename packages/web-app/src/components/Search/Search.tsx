/** @jsxImportSource @emotion/react */
import { TextField } from "components/TextField"
import React, { FC } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import "twin.macro"

type Inputs = {
  searchTerm: string
}

export const Search: FC<{}> = ({ ...props }) => {
  const { register, handleSubmit } = useForm<Inputs>()
  const navigate = useNavigate()

  return (
    <form
      tw="grid gap-4"
      onSubmit={handleSubmit<Inputs>(({ searchTerm }) => {
        const s = searchTerm.replace(/\s/g, "")
        navigate(
          s.startsWith("@")
            ? `/user/${s.slice(1)}/twit`
            : `/hashtag/${s.startsWith("#") ? s.slice(1) : s}/twit`,
        )
      })}
      {...props}
    >
      <TextField
        name="searchTerm"
        placeholder="Search"
        size={9}
        ref={register()}
      />
    </form>
  )
}
