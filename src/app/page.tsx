import Aurora from '@/components/Aurora';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ArrowRight,
  CheckCircle,
  Clock,
  MapPin,
  Search,
  Share2,
  Upload,
} from 'lucide-react';
import Link from 'next/link';
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-28 lg:py-36 overflow-hidden bg-gradient-to-b from-secondary to-background">
        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium animate-fade-in">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Instantly connect lost items with their owners
            </div>

            <div className="space-y-4 max-w-3xl animate-fade-in delay-100">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                Lost Something? Found Something?
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
                Our intelligent Lost & Found platform uses advanced matching to
                reunite people with their lost belongings.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-4 animate-fade-in delay-200">
              <Button
                asChild
                size="lg"
                className="button-hover rounded-full px-8 shadow-lg shadow-primary/20 font-medium"
              >
                <a href="/report-lost">
                  Report Lost Item <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="button-hover rounded-full px-8 backdrop-blur-sm bg-white/30 border-white/40 font-medium"
              >
                <a href="/report-found">Report Found Item</a>
              </Button>
            </div>

            <div className="w-full max-w-3xl h-[30vh] mt-8 rounded-3xl glass-card shadow-xl animate-fade-in delay-300 overflow-hidden">
              <Aurora
                colorStops={['#3A29FF', '#FF94B4', '#FF3232']}
                blend={0.5}
                amplitude={1.0}
                speed={0.5}
              />
              <div className="w-full h-full  flex items-center justify-center">
                <div className="relative animate-float">
                  <div className="absolute -inset-px rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-lg"></div>
                  <MapPin size={120} className=" text-black" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-20 md:py-28 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/70 text-secondary-foreground text-sm font-medium mb-4 animate-fade-in">
              SIMPLE PROCESS
            </div>
            <div className="space-y-3 animate-fade-in delay-100">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                How It Works
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Our streamlined platform makes it easy to report and find lost
                items
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12 mt-16">
            {/* Card 1 */}
            <Card className="relative overflow-hidden border-0 bg-gradient-to-b from-background to-secondary/20 hover-lift animate-scale-in rounded-2xl shadow-md">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full"></div>
              <CardHeader className="pb-2">
                <div className="flex h-18 w-18 items-center justify-center rounded-full glass-icon p-4 shadow-sm mb-4">
                  <Upload className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-2xl">Report</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-foreground/80">
                  Easily report lost or found items with detailed descriptions
                  and photos to help with matching
                </CardDescription>
              </CardContent>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
            </Card>

            {/* Card 2 */}
            <Card className="relative overflow-hidden border-0 bg-gradient-to-b from-background to-secondary/20 hover-lift animate-scale-in delay-100 rounded-2xl shadow-md">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full"></div>
              <CardHeader className="pb-2">
                <div className="flex h-18 w-18 items-center justify-center rounded-full glass-icon p-4 shadow-sm mb-4">
                  <Search className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-2xl">Match</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-foreground/80">
                  Our AI system automatically matches lost items with found
                  items based on descriptions and location data
                </CardDescription>
              </CardContent>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
            </Card>

            {/* Card 3 */}
            <Card className="relative overflow-hidden border-0 bg-gradient-to-b from-background to-secondary/20 hover-lift animate-scale-in delay-200 rounded-2xl shadow-md">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full"></div>
              <CardHeader className="pb-2">
                <div className="flex h-18 w-18 items-center justify-center rounded-full glass-icon p-4 shadow-sm mb-4">
                  <CheckCircle className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-2xl">Reunite</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-foreground/80">
                  Connect securely with the finder or owner through our platform
                  and get your items back where they belong
                </CardDescription>
              </CardContent>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
            </Card>
          </div>
        </div>
      </section>

      {/* Browse Items Section */}
      <section className="w-full py-20 md:py-28 lg:py-32 bg-gradient-to-b from-background to-secondary/50 relative">
        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 xl:grid-cols-2">
            {/* Lost Items */}
            <div className="flex flex-col justify-center space-y-5 animate-slide-in delay-100">
              <div className="inline-flex items-center self-start px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                <Clock className="mr-1 h-4 w-4" /> RECENTLY LOST
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Browse Lost Items
                </h2>
                <p className="max-w-[600px] text-muted-foreground text-lg">
                  Check if someone has reported finding your lost item in our
                  extensive database
                </p>
              </div>
              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="button-hover rounded-full px-8 shadow-md font-medium"
                >
                  <Link href="/lost-items">
                    View Lost Items <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Found Items */}
            <div className="flex flex-col justify-center space-y-5 animate-slide-in delay-200">
              <div className="inline-flex items-center self-start px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                <Share2 className="mr-1 h-4 w-4" /> RECENTLY FOUND
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Browse Found Items
                </h2>
                <p className="max-w-[600px] text-muted-foreground text-lg">
                  See if your lost item has been found and reported by someone
                  in our community
                </p>
              </div>
              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="button-hover rounded-full px-8 shadow-md font-medium"
                >
                  <Link href="/found-items">
                    View Found Items <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 md:py-28 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="relative w-full max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent rounded-3xl"></div>
            <div className="relative glass-card rounded-3xl shadow-xl p-10 md:p-16 overflow-hidden">
              <div className="absolute inset-0 bg-noise opacity-[0.02]"></div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/5 rounded-tr-full"></div>

              <div className="flex flex-col items-center justify-center space-y-6 text-center relative z-10">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium animate-fade-in">
                  GET STARTED IN SECONDS
                </div>
                <div className="space-y-3 animate-fade-in delay-100">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Ready to Recover Your Items?
                  </h2>
                  <p className="mx-auto max-w-[700px] text-foreground/70 md:text-xl">
                    Sign in with your account to start reporting lost or found
                    items and help others recover theirs
                  </p>
                </div>
                <div className="animate-fade-in delay-200 pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="button-hover rounded-full px-10 py-6 shadow-lg shadow-primary/20 font-medium text-lg"
                  >
                    <a href="/auth/signin">
                      Sign in Now <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
