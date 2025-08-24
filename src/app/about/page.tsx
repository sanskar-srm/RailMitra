import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Train, Rocket, Target, Eye } from 'lucide-react';

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
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Train className="h-6 w-6 text-primary" />
                  About Railमित्र
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  Railमित्र is a student project I built with the aim of making railway travel in India easier and more convenient. It brings together useful features like live train tracking, PNR status checks, and seat availability—all in one simple platform.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Rocket className="h-6 w-6 text-primary" />
                  How It Started
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  The idea for Railमित्र came in 2024 when I realized how confusing and time-consuming it can be to find reliable train information. As part of my learning journey, I decided to create a web app that could solve this problem. What started as a small project for practice turned into a complete platform that I’m proud to share.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Target className="h-6 w-6 text-primary" />
                  My Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  My mission with Railमित्र is to help passengers access accurate, real-time train information quickly and easily. More than just a project, it’s my attempt to show how technology can improve everyday experiences like travel.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Eye className="h-6 w-6 text-primary" />
                  The Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  Railमित्र reflects both my passion for technology and my interest in solving real-world problems. While it began as a personal project, I hope it can inspire others and maybe even grow into a tool that genuinely helps travelers across India.
                </p>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
