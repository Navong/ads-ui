export type AdResult = {
    unit: string
    format: string
    w: number
    h: number
    creativeId: string
    ad: string
  }
  
  export type FetchAdsResponse = {
    code: number
    msg: string
    result: AdResult
  }
  
  export async function fetchAds(
    unit_id: string,
    user_id: string,
    platform = "web",
    locale = "en-US",
  ): Promise<AdResult> {
    try {
      const response = await fetch("/api/fetchAds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ unit_id, user_id, platform, locale }),
      })
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
  
      const data = await response.json()
  
      if (data.code !== 0 || data.msg !== "OK") {
        throw new Error(`Error: ${data.msg} (Code: ${data.code})`)
      }
  
      return data.result
    } catch (error: any) {
      throw new Error(`Failed to fetch ads: ${(error as Error).message}`)
    }
  }
  
  