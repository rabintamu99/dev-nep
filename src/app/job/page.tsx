
import Link from "next/link"

export default function Component() {
  return (
    <section className="w-full h-full py-20">
      <div className="container flex flex-col items-center px-4 space-y-4 md:px-6 md:space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Jobs </h1>
          <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
          exclusive job listings tailored for professional software engineers</p>
        </div>
        <div className="space-y-4">
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            href="#"
          >
            Comming Soon
          </Link>
        </div>
      </div>
    </section>
  )
}

