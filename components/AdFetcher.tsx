"use client"

import { useState } from "react"
import { fetchAds, type AdResult } from "../app/fetchAds"

export default function AdFetcher() {
    const [adData, setAdData] = useState<AdResult | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleFetchAd = async () => {
        setLoading(true)
        setError(null)
        try {
            const result = await fetchAds("PUBLIC_TEST_UNIT_ID_320_100", "nolan", "web", "en-US")
            setAdData(result)
        } catch (err) {
            setError((err as Error).message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Ad Fetcher</h2>
                <div className="mb-4">
                    <button
                        onClick={handleFetchAd}
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                    >
                        {loading ? "Fetching..." : "Fetch Ad"}
                    </button>
                </div>

                {error && <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">Error: {error}</div>}

                {adData && (
                    <div className="mt-8 bg-gray-50 rounded-lg p-6">
                        <h3 className="text-xl font-bold mb-4">Ad Data</h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-bold text-lg mb-2">Ad Content:</h4>
                                <div
                                    dangerouslySetInnerHTML={{ __html: adData.ad }}
                                    className="border border-gray-300 p-4 rounded-md bg-white"
                                />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-2">Other Ad Data:</h4>
                                <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-md overflow-x-auto">
                                    {JSON.stringify({ ...adData, ad: "[HTML Content]" }, null, 2)}
                                </pre>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

