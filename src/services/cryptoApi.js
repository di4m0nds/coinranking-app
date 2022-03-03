import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import env from '../config.json'

const {
    CRYPTO_URL, HOST, HOST_VALUE, KEY, KEY_VALUE
} = env.CryptoApi

const cryptoApiHeaders = {}
cryptoApiHeaders[HOST] = HOST_VALUE
cryptoApiHeaders[KEY] = KEY_VALUE

const baseUrl = CRYPTO_URL;

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timePeriod }) => createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`)
        })
    })
})

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;