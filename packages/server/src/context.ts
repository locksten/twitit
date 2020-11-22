import { Pool } from "pg"

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export type AppContext = {
  pool: Pool
}

export const appContext: AppContext = { pool }
