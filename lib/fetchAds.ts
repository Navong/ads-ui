import axios, { AxiosRequestConfig } from 'axios';
require('dotenv').config();
type AdResult = {
    unit: string;
    format: string;
    w: number;
    h: number;
    creativeId: string;
    ad: string;
};

export type FetchAdsResponse = {
    code: number;
    msg: string;
    result: AdResult;
};

export async function fetchAds(
    unit_id: string,
    user_id: string,
    platform: string = 'web',
    locale: string = 'en-US'
): Promise<AdResult> {

    if (!process.env.API_KEY) {
        throw new Error('Missing API Key. Please set the API_KEY environment variable.');
    }
    
    
    const config: AxiosRequestConfig = {
        method: 'get',
        baseURL: 'https://api-v2.adrop.io',
        url: `/request?unit=${unit_id}&uid=${user_id}&pf=${platform}&lcl=${locale}`,
        headers: {
            'Authorization': `${process.env.API_KEY}`,
        }
    };

    try {
        const response = await axios.request<FetchAdsResponse>(config);

        // Check if the response indicates an error based on `code` and `msg`
        if (response.data.code !== 0 || response.data.msg !== 'OK') {
            throw new Error(`Error: ${response.data.msg} (Code: ${response.data.code})`);
        }

        return response.data.result;

    } catch (error: any) {
        throw new Error(`Failed to fetch ads: ${(error as Error).message}`);
    }
}


