import { Pool } from "pg"

export const pool = new Pool({
  connectionString:
    "postgres://postgres:@localhost:5432/twitit?sslmode=disable",
})

export type AppContext = {
  pool: Pool
}

export const appContext: AppContext = { pool }
