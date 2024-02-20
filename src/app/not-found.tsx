import Link from "next/link"

import { Button } from "@/components/ui/Button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen mt-10">
      <Card className="w-[420px]">
        <CardHeader className="text-center">
          <CardTitle className="lg:text-5xl text-4xl">404</CardTitle>
          <CardDescription>
            The page you’re looking for doesn’t exist.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button >
            <Link href="/">Go Back</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}