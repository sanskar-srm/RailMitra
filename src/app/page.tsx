import { Clock, Zap, ShieldCheck, Star, CheckCircle } from "lucide-react";
import Link from 'next/link';
import Header from '@/components/layout/header';
import SearchTabs from '@/components/features/search-tabs';

const coreFeatures = [
  {
    icon: <Clock className="h-6 w-6 text-yellow-400" />,
    title: "Real-time Tracking",
    description: "Live train positions and delays",
    href: "/dashboard"
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-yellow-400" />,
    title: "Reliable Data",
    description: "Official Indian Railways data",
    href: "/dashboard"
  },
  {
    icon: <Zap className="h-6 w-6 text-yellow-400" />,
    title: "Lightning Fast",
    description: "Instant search results",
    href: "/dashboard"
  },
  {
    icon: <Star className="h-6 w-6 text-yellow-400" />,
    title: "Premium Experience",
    description: "Beautiful, intuitive interface",
    href: "/dashboard"
  },
];

const allFeatures = [
  "Live Train Status",
  "PNR Status Check",
  "Live Station Arrivals",
  "Seat Availability Checker",
  "Fare Comparison between Trains",
  "Train Number & Name Lookup",
  "Full Train Schedule",
  "Cancelled / Diverted / Rescheduled Train Info",
  "Live Train on Map (real-time GPS)",
  "Coach Layout and Position",
];

const stats = [
    { value: "68,000+", label: "Trains" },
    { value: "7,000+", label: "Stations" },
    { value: "99.9%", label: "Uptime" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-white/10 text-xs px-3 py-1 rounded-full">
                Live Train Tracking Platform
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
                Track Your <span className="text-yellow-400">Journey</span> Live
              </h1>
              <p className="text-lg text-gray-300 max-w-lg">
                Real-time train tracking, PNR status, live station updates, and more. The most comprehensive railway tracking platform for India.
              </p>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {coreFeatures.map((feature) => (
                  <Link href={feature.href} key={feature.title} className="bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-white/10 space-y-2 block hover:bg-white/10 transition-colors">
                    {feature.icon}
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16">
            <SearchTabs />
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-bold">{stat.value}</p>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <section id="features" className="py-16 md:py-24 bg-white/5">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold tracking-tighter">All-in-One Train Companion</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                From real-time tracking to seat availability, we've got everything you need for a smooth journey.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-4 bg-white/5 p-4 rounded-lg border border-white/10">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
