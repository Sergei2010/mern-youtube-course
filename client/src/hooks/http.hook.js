import { useState, useCallback } from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                //console.log(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, {method, body, headers})
            //console.log(url)
            //console.log(method)
            //console.log(body)
            //console.log(headers)
            //console.log(response)

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так')
            }

            setLoading(false)

            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            //console.log(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    //console.log(error)
    return { loading, request, error, clearError }
}