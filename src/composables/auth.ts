import { useQuery } from '@tanstack/vue-query'

async function callAuth() {
    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'X-Frappe-Site-Name': window.location.hostname,
    } as Record<string, string>

    if (window.csrf_token && window.csrf_token !== '{{ csrf_token }}') {
        headers['X-Frappe-CSRF-Token'] = window.csrf_token
    }

    const res = await fetch(`/api/method/frappe.auth.get_logged_user`, {
        method: 'GET',
        headers,
        credentials: 'include',
    })
    return res.json()
}

export function useAuth() {
    const { isPending, isFetching, isError, data, error } = useQuery({
        queryKey: ['todos'],
        queryFn: callAuth,
    })

    console.log({ user: data })
}
