import { SessionProvider } from 'next-auth/react'
import Header from './Header'

const Layout = ({ children }) => {
    return (
        <SessionProvider>
            <Header />
            {children}
        </SessionProvider>
    )
}

export default Layout
