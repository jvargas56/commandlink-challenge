import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './store/provider/provider'
import Header from '@/app/components/organisms/header/header';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Adrián Dynamyc Forms',
  description: 'Good challenge',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  )
}
