"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Ticket, TrainFront, Building2, Bot, AlertTriangle, LayoutDashboard } from "lucide-react";

type DashboardProps = {
  setActiveView: (view: string) => void;
};

export default function Dashboard({ setActiveView }: DashboardProps) {
  const features = [
    { title: "Live Train Status", icon: TrainFront, view: "live-status", description: "Track your train in real-time on the map." },
    { title: "PNR Status", icon: Ticket, view: "pnr-status", description: "Check your ticket confirmation and seat status." },
    { title: "Live Station", icon: Building2, view: "live-station", description: "See all trains arriving or departing from a station." },
    { title: "Train Alerts", icon: AlertTriangle, view: "alerts", description: "Info on cancelled, diverted, or rescheduled trains." },
    { title: "AI Route Suggestion", icon: Bot, view: "ai-suggester", description: "Get alternate routes for delayed or cancelled trains." },
  ];

  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Navigate the Railways with Confidence</h1>
        <p className="text-muted-foreground mt-2 text-lg">Your all-in-one companion for Indian Railways travel.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.view} className="flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">{feature.title}</CardTitle>
              <feature.icon className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
            <CardFooter>
                <Button onClick={() => setActiveView(feature.view)} className="w-full">
                Go to {feature.title} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
