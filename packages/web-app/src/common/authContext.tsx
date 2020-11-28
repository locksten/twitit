/** @jsxImportSource @emotion/react */
import React, { createContext, FC, useContext, useState } from "react"
import "twin.macro"

export type AuthState = { accessToken: string }

type AuthContextType = {
  isLoggedIn: boolean
  logIn: ({ accessToken }: AuthState) => void
  logOut: () => void
  getToken: () => string | null
}

const AuthContext = createContext<AuthContextType>(
  (undefined as unknown) as AuthContextType,
)

export const useAuth = () => {
  return useContext(AuthContext)
}

export const useAuthProvider = () => {
  const [isLoggedIn, setIsloggedIn] = useState(
    !!localStorage.getItem("accessToken"),
  )
  const logIn: AuthContextType["logIn"] = ({ accessToken }) => {
    localStorage.setItem("accessToken", accessToken)
    setIsloggedIn(true)
  }
  const logOut = () => {
    localStorage.removeItem("accessToken")
    setIsloggedIn(false)
  }
  const getToken = () => localStorage.getItem("accessToken")

  const AuthContextProvider: FC<{}> = ({ children }) => {
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn,
          logIn,
          logOut,
          getToken,
        }}
      >
        {children}
      </AuthContext.Provider>
    )
  }

  return {
    AuthContextProvider,
    isLoggedIn,
    logIn,
    logOut,
    getToken,
  }
}
