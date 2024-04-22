export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className='mx-auto max-w-96 px-4 pt-10'>{children}</div>
}
