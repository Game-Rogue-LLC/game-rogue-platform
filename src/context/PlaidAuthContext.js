import { createContext, useEffect, useState } from 'react'

import apiRequest from '@/lib/requests/apiRequest'

const PlaidAuthContext = createContext()

const PlaidAuthContextProvider = ({ children }) => {
    const [auth, setAuth] = useState({ isAuthenticated: false, loadingAuthentication: true })  

    const checkAuth = async () => {
        try {
            const dataAuth = await apiRequest('/api/auth')
            if (dataAuth && dataAuth.status_code >= 200 && dataAuth.status_code < 300) {
                setAuth({ isAuthenticated: true, loadingAuthentication: false })
            } else {
                setAuth({ isAuthenticated: false, loadingAuthentication: false })
            }
        } catch (err) {
            setAuth({ isAuthenticated: false, loadingAuthentication: false })
            console.error(err)
        }
    }

    useEffect(() => {
        checkAuth()
    }, [])

    return (
        <PlaidAuthContext.Provider value={ { checkAuth, ...auth } }>
            {children}
        </PlaidAuthContext.Provider>
    )
}

export default PlaidAuthContextProvider
