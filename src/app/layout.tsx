import Navbar from '@/components/Navbar'
import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/Toaster'
import Footer from '@/components/footer'
import '@/styles/globals.css'
import { ThemeProvider } from "@/components/theme-provider"
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DevNep',
  description: 'nepals thriving tech community, connecting talents with oppurtunities',
}

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode
  authModal: React.ReactNode
}) {
  return (
    
    <html
      lang='en'
      className={cn(
        'bg-white  text-slate-900 antialiased light',
        inter.className
      )}>
        
        
      <body className='min-h-screen  max-w-8xl pt-8 bg-slate-50 dark:bg-zinc-950 antialiased'>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Providers>
      
          {/* @ts-expect-error Server Component */}
          <Navbar />
          {authModal}
          <div className='container max-w-8xl mx-auto min-h-screen pt-12'>
            {children}
          </div>
          <Footer />
          </Providers>
          </ThemeProvider>
      
        <Toaster />
      </body>
     
    </html>
  )
}
