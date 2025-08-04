import { Clock, Zap, ShieldCheck, Star } from "lucide-react";
import Header from '@/components/layout/header';
import SearchTabs from '@/components/features/search-tabs';

const features = [
  {
    icon: <Clock className="h-6 w-6 text-yellow-400" />,
    title: "Real-time Tracking",
    description: "Live train positions and delays",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-yellow-400" />,
    title: "Reliable Data",
    description: "Official Indian Railways data",
  },
  {
    icon: <Zap className="h-6 w-6 text-yellow-400" />,
    title: "Lightning Fast",
    description: "Instant search results",
  },
  {
    icon: <Star className="h-6 w-6 text-yellow-400" />,
    title: "Premium Experience",
    description: "Beautiful, intuitive interface",
  },
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
                {features.map((feature) => (
                  <div key={feature.title} className="bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-white/10 space-y-2">
                    {feature.icon}
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
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
      </main>
    </div>
  );
}
