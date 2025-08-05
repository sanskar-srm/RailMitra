import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Target, Rocket } from 'lucide-react';

const teamMembers = [
  {
    name: "Sanskar",
    role: "Founder & CEO",
    avatarUrl: "https://placehold.co/100x100.png",
    dataAiHint: "person portrait"
  },
  {
    name: "Jane Doe",
    role: "Lead Developer",
    avatarUrl: "https://placehold.co/100x100.png",
    dataAiHint: "person portrait"
  },
  {
    name: "John Smith",
    role: "UX/UI Designer",
    avatarUrl: "https://placehold.co/100x100.png",
    dataAiHint: "person portrait"
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
              About <span className="text-accent">Railमित्र</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              We are a passionate team dedicated to simplifying railway travel across India. Our mission is to provide the most accurate, real-time, and user-friendly train information platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <img src="https://placehold.co/600x400.png" alt="Team working" className="rounded-xl shadow-lg" data-ai-hint="team collaboration" />
            </div>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Our Story</h2>
                  <p className="text-gray-400 mt-2">
                    Founded in 2024, Railमित्र started as a small project fueled by the frustration of navigating a complex railway system. We envisioned a single platform that would bring clarity and ease to millions of travelers. Today, we are proud to serve thousands of users daily.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="bg-primary/10 p-3 rounded-full">
                   <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Our Mission</h2>
                  <p className="text-gray-400 mt-2">
                    Our mission is to empower every railway passenger in India with reliable, instant, and accessible train information. We strive to build intuitive tools that make journey planning seamless and stress-free, from checking PNR status to tracking your train in real-time.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold tracking-tighter">Meet the Team</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              The driving force behind Railमित्र's success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="glowing-card-container rounded-xl">
                <div className="glowing-card-content bg-white/5 p-6 text-center space-y-4">
                  <Avatar className="h-24 w-24 mx-auto border-4 border-primary/50">
                    <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint={member.dataAiHint} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-primary">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
