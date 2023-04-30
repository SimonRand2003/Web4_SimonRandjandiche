import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import Header from './Header';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <SessionProvider>
            <Header />
            {children}
        </SessionProvider>
    );
};

export default Layout;
