export function httpRequestFactory(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    data?: Record<string, any>,
    noError: boolean = false
) {
    return async function () {
        let headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'X-Frappe-Site-Name': window.location.hostname,
        } as Record<string, string>

        // Include CSRF token if available
        if (window.csrf_token && window.csrf_token !== '{{ csrf_token }}') {
            headers['X-Frappe-CSRF-Token'] = window.csrf_token
        }

        // If noError is true, we want to return the response as-is without throwing an error for non-2xx status codes.
        // This useful for endpoints with fallback logic on the client side, like checking if the user is logged in or not.
        if (noError) {
            try {
                const res = await fetch(url, {
                    method: method,
                    headers,
                    credentials: 'include',
                    body: data ? JSON.stringify(data) : undefined,
                })
                return await res.json()
            } catch (error) {
                console.error('HTTP Request Error:', error)
                // Instead of throwing the error, we return null or you could return the error object itself based on your needs.
                return null
            }
        }

        // Default behavior: throw an error for non-2xx status codes or if there's a Frappe exception in the response.
        try {
            const res = await fetch(url, {
                method: method,
                headers,
                credentials: 'include',
                body: data ? JSON.stringify(data) : undefined,
            })

            let payload: any = null
            const contentType = res.headers.get('content-type') ?? ''
            if (contentType.includes('application/json')) {
                payload = await res.json()
            } else {
                payload = await res.text()
            }

            const hasFrappeException =
                payload &&
                typeof payload === 'object' &&
                ('exception' in payload || 'exc_type' in payload)

            if (!res.ok || hasFrappeException) {
                const message =
                    typeof payload === 'object' && payload?.message
                        ? payload.message
                        : `Request failed with status ${res.status}`
                const error = new Error(message) as Error & {
                    status?: number
                    data?: unknown
                }
                error.status = res.status
                error.data = payload
                throw error
            }

            return payload
        } catch (error) {
            console.error('HTTP Request Error:', error)
            throw error
        }
    }
}
