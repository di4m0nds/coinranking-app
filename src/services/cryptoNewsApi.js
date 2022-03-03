import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import env from '../config.json'

const {
    BING_API,
    BING_URL,
    HOST,
    HOST_VALUE,
    KEY,
    KEY_VALUE
} = env.NewsApi

const cryptoNewsApiHeaders = {}
cryptoNewsApiHeaders[BING_API] = 'true'
cryptoNewsApiHeaders[HOST] = HOST_VALUE
cryptoNewsApiHeaders[KEY] = KEY_VALUE

const baseUrl = BING_URL;

const createRequest = (url) => ({ url, headers: cryptoNewsApiHeaders });

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptosNews: builder.query({
            query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})

export const { useGetCryptosNewsQuery } = cryptoNewsApi;