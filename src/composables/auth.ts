import { useQuery } from '@tanstack/vue-query'

import { httpRequestFactory } from '../utils/req'

export function useAuth() {
    const getLoggedUser = httpRequestFactory(
        'GET',
        '/api/method/frappe.auth.get_logged_user',
        undefined,
        true // noError is true because this endpoint will return a 403 if the user is not logged in, and we want to handle that gracefully without throwing an error.
    )
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['loggedUser'],
        queryFn: getLoggedUser,
        select: (data) => {
            return data?.message ?? null
        },
        retry: false, // Don't retry on failure, as it is probably due to the user not being logged in.
    })
    // console.log({ data })
    return { username: data, isLoading, isError, error, refetch }
}
