"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, TrainFront, Clock, MapPin, Gauge, Route } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function LiveTrainStatus() {
  const [trainNumber, setTrainNumber] = useState('');
  const [trainData, setTrainData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainNumber) return;
    setLoading(true);
    setTrainData(null);
    // Mock API call
    setTimeout(() => {
      setTrainData({
        name: 'Mumbai Rajdhani',
        number: '12951',
        currentStation: 'Ratlam Jn',
        nextStation: 'Kota Jn',
        delay: 15, // in minutes
        speed: '110 km/h',
        distanceCovered: 850,
        totalDistance: 1386,
        schedule: [
          { station: 'Mumbai Central', time: '17:00' },
          { station: 'Borivali', time: '17:22' },
          { station: 'Surat', time: '19:43' },
          { station: 'Vadodara Jn', time: '21:06' },
          { station: 'Ratlam Jn', time: '00:22', current: true },
          { station: 'Kota Jn', time: '03:15' },
          { station: 'New Delhi', time: '08:32' },
        ],
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in-50">
      <Card>
        <CardHeader>
          <CardTitle>Live Train Status</CardTitle>
          <CardDescription>Enter train number or name to get its live running status.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow">
              <Label htmlFor="train-number" className="sr-only">Train Number or Name</Label>
              <Input
                id="train-number"
                placeholder="e.g., 12951 or Mumbai Rajdhani"
                value={trainNumber}
                onChange={(e) => setTrainNumber(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              <Search className="mr-2 h-4 w-4" /> {loading ? 'Searching...' : 'Search'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {loading && <div className="text-center p-8"><p>Loading train data...</p><Progress value={50} className="w-1/2 mx-auto mt-2 animate-pulse" /></div>}

      {trainData && (
        <Card className="animate-in fade-in-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><TrainFront /> {trainData.name} ({trainData.number})</CardTitle>
            <CardDescription>Last updated: a few seconds ago</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <Alert><MapPin className="h-4 w-4" /><AlertTitle>Current Station</AlertTitle><AlertDescription>{trainData.currentStation}</AlertDescription></Alert>
                <Alert><Route className="h-4 w-4" /><AlertTitle>Next Station</AlertTitle><AlertDescription>{trainData.nextStation}</AlertDescription></Alert>
                <Alert variant="destructive"><Clock className="h-4 w-4" /><AlertTitle>Delay</AlertTitle><AlertDescription>{trainData.delay} mins</AlertDescription></Alert>
                <Alert><Gauge className="h-4 w-4" /><AlertTitle>Speed</AlertTitle><AlertDescription>{trainData.speed}</AlertDescription></Alert>
            </div>

            <div>
              <Label>Journey Progress</Label>
              <Progress value={(trainData.distanceCovered / trainData.totalDistance) * 100} className="mt-2 h-3" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{trainData.schedule[0].station}</span>
                <span>{((trainData.distanceCovered / trainData.totalDistance) * 100).toFixed(0)}% complete</span>
                <span>{trainData.schedule[trainData.schedule.length - 1].station}</span>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-4 text-lg">Route Timeline</h3>
              <div className="relative pl-6">
                {trainData.schedule.map((stop: any, index: number) => (
                  <div key={index} className={`relative flex items-start pb-8 last:pb-0 ${stop.current ? 'font-bold text-primary' : ''}`}>
                    <div className="absolute left-[-0.375rem] top-[0.125rem] h-full w-px bg-border"></div>
                    <div className={`absolute left-[-0.75rem] top-0 h-6 w-6 rounded-full flex items-center justify-center ${stop.current ? 'bg-primary ring-4 ring-primary/20' : 'bg-muted border-2'}`}>
                      {stop.current && <div className="h-2 w-2 rounded-full bg-primary-foreground"></div>}
                    </div>
                    <div className="ml-6">
                      <p className="text-sm">{stop.station}</p>
                      <p className="text-xs text-muted-foreground">{stop.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
