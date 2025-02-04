import { NextResponse } from "next/server"
import axios from "axios"

const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjAxSEQ1UTNaOEdYTk5XRjQ2NENOV0NNQlM0OjAxSEZCTU1HRkZXUU5OMk5aVkpCNU5GUFZaIiwia2V5VHlwZSI6MSwiaWF0IjoxNzAwMTI0MDQ5LCJleHAiOjI1MzQwMjEyODAwMH0.J877rLr4xvUWqcEzsesEp_KNzO8XnHaJeESPXdABubQ"

export async function POST(req: Request) {
  const { unit_id, user_id, platform, locale } = await req.json()

  try {
    const response = await axios.get("https://api-v2.adrop.io/request", {
      params: {
        unit: unit_id,
        uid: user_id,
        pf: platform,
        lcl: locale,
      },
      headers: {
        Authorization: API_KEY,
      },
    })

    return NextResponse.json(response.data)
  } catch (error: any) {
    return NextResponse.json({ error: `Failed to fetch ads: ${error.message}` }, { status: 500 })
  }
}

