
import '@/assets/styles/globals.css';
import Navbar from '@/components/Navbar';
import AuthProvider from '@/components/AuthProvider';
import ToastProvider from '@/components/ToastProvider';
import {Inter} from 'next/font/google';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter'
})

const MainLayout = ({children}) => {
  return (
    <AuthProvider>
      <html className={`${inter.variable}`} lang="en">
        <body className='bg-black'>
          <ToastProvider>
            <Navbar />
            <main>{children}</main>
          </ToastProvider>
        </body>
      </html>
    </AuthProvider>
  )
}

export default MainLayout;