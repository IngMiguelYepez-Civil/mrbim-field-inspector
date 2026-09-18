import { Agentation } from 'agentation'
import { GeistPixelSquare } from 'geist/font/pixel'
import localFont from 'next/font/local'
import { ClientBootstrap } from './client-bootstrap'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      className={`${geistSans.variable} ${geistMono.variable} ${GeistPixelSquare.variable}`}
      lang="en"
    >
      <head>
        {process.env.NODE_ENV === 'development' && (
          <script async crossOrigin="anonymous" src="//unpkg.com/react-scan/dist/auto.global.js" />
        )}
      </head>
      <body className="font-sans">
        <ClientBootstrap>{children}</ClientBootstrap>
        {process.env.NODE_ENV === 'development' && <Agentation />}
      </body>
    </html>
  )
}
