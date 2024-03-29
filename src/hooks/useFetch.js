import { useEffect, useState } from "react";

/**
 * 
 * @param {string} url 
 * @param {FetchEventInit} options 
 */
export function useFetech(url, options = {}) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [errors, setErrors] = useState(null)

    useEffect(() => {
        fetch(url, {
            'Accept': 'application/json; charset=UTF-8',
            ...options.headers
        }).then(r => r.json()).then(data => {
            setLoading(false)
            setData(data)
        }).catch((e) => {
            setErrors(e)
        }).finally(() => {
            setLoading(false)
        });
    })

    return {
        loading, data, errors
    }
}