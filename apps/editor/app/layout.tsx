import { Agentation } from 'agentation'
import { GeistPixelSquare } from 'geist/font/pixel'
import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { ClientBootstrap } from './client-bootstrap'
import { PwaRegistration } from './pwa-registration'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
})


export const metadata: Metadata = {
  title: {
    default: 'MrBIM Field Inspector',
    template: '%s | MrBIM Field Inspector',
  },
  description: 'Inspección BIM móvil, revisión de modelos y registro de incidencias en obra.',
  applicationName: 'MrBIM Field Inspector',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'MrBIM Inspector',
  },
}

export const viewport: Viewport = {
  themeColor: '#111827',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      className={`${geistSans.variable} ${geistMono.variable} ${GeistPixelSquare.variable}`}
      lang="es"
    >
      <head>
        {process.env.NODE_ENV === 'development' && (
          <script async crossOrigin="anonymous" src="//unpkg.com/react-scan/dist/auto.global.js" />
        )}
      </head>
      <body className="font-sans">
        <PwaRegistration />
        <ClientBootstrap>{children}</ClientBootstrap>
        {process.env.NODE_ENV === 'development' && <Agentation />}
      </body>
    </html>
  )
}
