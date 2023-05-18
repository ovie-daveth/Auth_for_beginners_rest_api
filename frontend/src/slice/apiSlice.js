//my middle man between my query and my client
//this code sets up the basic structure for an API client using Redux Toolkit Query, but it doesn't define any specific API endpoints yet.

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const baseQuery = fetchBaseQuery({baseUrl: 'http://localhost:8000'}) // base url =="" becaue axious.default is set to "http://localhost:` This baseUrl will be the base URL for all API requests made by the client.


export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'], // This is an array of strings that represent the different types of data that can be fetched from the API. In this case, there is only one type, 'User'.
    endpoints: (builder) => ({}),
  });

//   The endpoints:() is a function that defines the endpoints for making specific API requests. However, in this code snippet, the function is empty, so no endpoints are defined yet. The would be defined in another file (userApiSlicer.js)