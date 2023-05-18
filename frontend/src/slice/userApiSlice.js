import { apiSlice } from "./apiSlice";

const USERS_URL = '/api'; //FROM MY BACKEND, all my users have same url prefix

export const userApiSlice = apiSlice.injectEndpoints({  //the endpoints ofour api call to backend
  endpoints: (builder) => ({ 
    login: builder.mutation ({ query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({ query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    register: builder.mutation({ query: (data) => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: builder.mutation({ query: (data) => ({
        url: `${USERS_URL}/user`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
} = userApiSlice;
