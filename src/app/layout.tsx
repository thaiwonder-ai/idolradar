import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Idol Radar | Fan Pulse',
  description: 'Your Pulse on Idol Updates',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
