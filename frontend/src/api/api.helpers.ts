import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const baseQuery = fetchBaseQuery({
    baseUrl: '/api',
});

export const customFetchBase: BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    const result = await baseQuery(args, api, extraOptions);
    //Тут должна быть логика разлогина или рефреш токена
    return result;
};