import React, { useState, useContext, useCallback, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/auth.context'
import { Loader } from '../components/Loader'
import { LinksList } from './LinksList'

export const LinksPage = () =>{
    const [links, setLinks] = useState([])
    const { request, loading } = useHttp()
    const { token } = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request(`/api/link`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        } catch (error) { }
    }, [token, request])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if (loading) {
        return <Loader />
    }

    return (
       <>
        {!loading && <LinksList links={links} />}
       </>
    )
}