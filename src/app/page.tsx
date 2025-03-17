import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Upload, CheckCircle } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Lost Something? Found Something?
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Our Lost & Found Portal helps connect lost items with their owners.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/report-lost">Report Lost Item</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/report-found">Report Found Item</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Our platform makes it easy to report and find lost items
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
            <Card className="flex flex-col items-center text-center">
              <CardHeader>
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <Upload className="h-10 w-10" />
                </div>
                <CardTitle className="mt-4">Report</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Report lost or found items with detailed descriptions to help with matching
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center text-center">
              <CardHeader>
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <Search className="h-10 w-10" />
                </div>
                <CardTitle className="mt-4">Match</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our system automatically matches lost items with found items based on descriptions
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center text-center">
              <CardHeader>
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <CheckCircle className="h-10 w-10" />
                </div>
                <CardTitle className="mt-4">Reunite</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Connect with the finder or owner and get your items back where they belong
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Browse Lost Items</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Check if someone has reported finding your lost item
                </p>
              </div>
              <div>
                <Button asChild size="lg">
                  <Link href="/lost-items">View Lost Items</Link>
                </Button>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Browse Found Items</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See if your lost item has been found and reported by someone
                </p>
              </div>
              <div>
                <Button asChild size="lg">
                  <Link href="/found-items">View Found Items</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Sign in with your Google account to report lost or found items
              </p>
            </div>
            <div>
              <Button asChild size="lg">
                <Link href="/auth/signin">Sign in with Google</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

