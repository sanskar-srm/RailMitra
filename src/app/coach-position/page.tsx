
"use client";
import React, { useState } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrainFront, AlertTriangle, Armchair } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

const trainCoaches = [
  { name: 'L', type: 'engine' },
  { name: 'SLR', type: 'gen' },
  { name: 'GS', type: 'gen' },
  { name: 'GS', type: 'gen' },
  { name: 'S1', type: 'sleeper' },
  { name: 'S2', type: 'sleeper' },
  { name: 'S3', type: 'sleeper' },
  { name: 'S4', type: 'sleeper' },
  { name: 'S5', type: 'sleeper' },
  { name: 'S6', type: 'sleeper' },
  { name: 'B1', type: 'ac' },
  { name: 'B2', type: 'ac' },
  { name: 'A1', type: 'ac' },
];

const sleeperLayout = {
  berths: [
    { num: 1, type: 'LOWER' }, { num: 2, type: 'MIDDLE' }, { num: 3, type: 'UPPER' }, { num: 7, type: 'S.LOWER' },
    { num: 4, type: 'LOWER' }, { num: 5, type: 'MIDDLE' }, { num: 6, type: 'UPPER' }, { num: 8, type: 'S.UPPER' },
    { num: 9, type: 'LOWER' }, { num: 10, type: 'MIDDLE' }, { num: 11, type: 'UPPER' }, { num: 15, type: 'S.LOWER' },
    { num: 12, type: 'LOWER' }, { num: 13, type: 'MIDDLE' }, { num: 14, type: 'UPPER' }, { num: 16, type: 'S.UPPER' },
    { num: 17, type: 'LOWER' }, { num: 18, type: 'MIDDLE' }, { num: 19, type: 'UPPER' }, { num: 23, type: 'S.LOWER' },
    { num: 20, type: 'LOWER' }, { num: 21, type: 'MIDDLE' }, { num: 22, type: 'UPPER' }, { num: 24, type: 'S.UPPER' },
  ],
  total: 72,
};

const acLayout = {
    berths: [
      { num: 1, type: 'LOWER' }, { num: 2, type: 'UPPER' }, { num: 5, type: 'S.LOWER' },
      { num: 3, type: 'LOWER' }, { num: 4, type: 'UPPER' }, { num: 6, type: 'S.UPPER' },
      { num: 7, type: 'LOWER' }, { num: 8, type: 'UPPER' }, { num: 11, type: 'S.LOWER' },
      { num: 9, type: 'LOWER' }, { num: 10, type: 'UPPER' }, { num: 12, type: 'S.UPPER' },
    ],
    total: 48,
};

const Seat = ({ number, type }: { number: number, type: string }) => (
    <div className={cn("bg-white/5 p-2 rounded-md text-center border border-white/10", {
        'col-start-1': type.includes('LOWER'),
        'col-start-2': type.includes('MIDDLE'),
        'col-start-3': type.includes('UPPER'),
        'col-start-5': type.includes('S.LOWER') || type.includes('S.UPPER'),
    })}>
        <p className="font-bold text-lg">{number}</p>
        <p className="text-xs text-gray-400">{type}</p>
    </div>
);


export default function CoachPositionPage() {
  const [selectedCoach, setSelectedCoach] = useState<{name: string, type: string} | null>(trainCoaches[4]);

  const getLayout = (type: string) => {
      if (type === 'sleeper') return sleeperLayout;
      if (type === 'ac') return acLayout;
      return null;
  }
  
  const layout = selectedCoach ? getLayout(selectedCoach.type) : null;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
              Coach & Seat Position
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Visualize your train's coach arrangement and find your exact seat. Select a coach to see its layout.
            </p>
          </div>

          <Card className="bg-white/5 border-white/10 mb-8">
            <CardHeader>
                <CardTitle>Coach Line-up</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-1 overflow-x-auto pb-4">
                    <TrainFront className="h-10 w-10 text-primary flex-shrink-0" />
                    <div className="h-1 w-4 bg-gray-500 flex-shrink-0"></div>
                    {trainCoaches.map((coach, index) => (
                        <React.Fragment key={index}>
                            <Button 
                                variant={selectedCoach?.name === coach.name && selectedCoach.type === coach.type ? "default" : "secondary"}
                                onClick={() => coach.type !== 'engine' && coach.type !== 'gen' && setSelectedCoach(coach)}
                                className={cn("flex-shrink-0 w-20 h-14 rounded-md", {
                                    'bg-primary/80 text-white': selectedCoach?.name === coach.name && selectedCoach.type === coach.type,
                                    'bg-gray-600 hover:bg-gray-500 cursor-not-allowed': coach.type === 'gen',
                                    'bg-transparent cursor-default p-0': coach.type === 'engine',
                                })}
                                disabled={coach.type === 'engine' || coach.type === 'gen'}
                            >
                                {coach.type !== 'engine' ? coach.name : ''}
                            </Button>
                            {index < trainCoaches.length - 1 && <div className="h-1 w-4 bg-gray-500 flex-shrink-0"></div>}
                        </React.Fragment>
                    ))}
                </div>
            </CardContent>
          </Card>

            <Alert variant="destructive" className="mb-8">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Coach position may not be accurate for certain trains. Please verify at the station.
              </AlertDescription>
            </Alert>
            
            {layout ? (
                 <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle>Seat Layout: Coach {selectedCoach?.name}</CardTitle>
                        <CardDescription>Total Berths: {layout.total}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,0.5fr)_repeat(1,minmax(0,1fr))] gap-x-4 gap-y-2 max-w-md mx-auto">
                            {layout.berths.map((berth) => (
                                <Seat key={berth.num} number={berth.num} type={berth.type} />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-12 text-center text-gray-400">
                        <Armchair className="h-12 w-12 mx-auto mb-4" />
                        <p>Select a Sleeper (S) or AC (A, B) coach to view its seat layout.</p>
                        <p className="text-sm">General (GS) and Luggage (SLR) coaches do not have reserved seating.</p>
                    </CardContent>
                </Card>
            )}

        </div>
      </main>
      <Footer />
    </div>
  );
}
