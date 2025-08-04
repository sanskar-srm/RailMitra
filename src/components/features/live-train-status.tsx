"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, TrainFront, Clock, MapPin, Gauge, Route, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getLiveTrainStatus } from '@/actions/get-live-train-status';

export default function LiveTrainStatus() {
  const [trainNumber, setTrainNumber] = useState('');
  const [trainData, setTrainData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainNumber) return;
    setLoading(true);
    setTrainData(null);
    setError(null);
    
    try {
      const result = await getLiveTrainStatus({ trainNumber: trainNumber });
      if(result.error) {
        throw new Error(result.error);
      }
      setTrainData(result.data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch train data. Please check the train number and your API key.");
    } finally {
      setLoading(false);
    }
  };

  const getProgress = () => {
    if (!trainData?.upcoming_stations || trainData.upcoming_stations.length === 0) return 0;
    const totalStations = trainData.previous_stations.length + trainData.upcoming_stations.length;
    const stationsPassed = trainData.previous_stations.length;
    return (stationsPassed / totalStations) * 100;
  }

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
                placeholder="e.g., 12951"
                value={trainNumber}
                onChange={(e) => setTrainNumber(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}

      {loading && <div className="text-center p-8"><Loader2 className="h-8 w-8 animate-spin mx-auto" /><p className="mt-2">Loading train data...</p></div>}

      {trainData && (
        <Card className="animate-in fade-in-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><TrainFront /> {trainData.train_name} ({trainData.train_number})</CardTitle>
            <CardDescription>Last updated: {trainData.data_from}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <Alert><MapPin className="h-4 w-4" /><AlertTitle>Current Station</AlertTitle><AlertDescription>{trainData.current_station_name}</AlertDescription></Alert>
                <Alert><Route className="h-4 w-4" /><AlertTitle>Next Station</AlertTitle><AlertDescription>{trainData.upcoming_stations?.[0]?.station_name || 'Destination'}</AlertDescription></Alert>
                <Alert variant={trainData.delay_minutes > 0 ? "destructive" : "default"}><Clock className="h-4 w-4" /><AlertTitle>Delay</AlertTitle><AlertDescription>{trainData.delay_minutes || 0} mins</AlertDescription></Alert>
                <Alert><Gauge className="h-4 w-4" /><AlertTitle>Status</AlertTitle><AlertDescription>{trainData.running_status}</AlertDescription></Alert>
            </div>

            <div>
              <Label>Journey Progress</Label>
              <Progress value={getProgress()} className="mt-2 h-3" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{trainData.source_station_name}</span>
                <span>{getProgress().toFixed(0)}% complete</span>
                <span>{trainData.destination_station_name}</span>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-4 text-lg">Route Timeline</h3>
              <div className="relative pl-6 max-h-96 overflow-y-auto">
                {trainData.previous_stations.map((stop: any, index: number) => (
                  <div key={index} className="relative flex items-start pb-8 last:pb-0 text-muted-foreground">
                    <div className="absolute left-[-0.375rem] top-[0.125rem] h-full w-px bg-border"></div>
                     <div className="absolute left-[-0.75rem] top-0 h-6 w-6 rounded-full flex items-center justify-center bg-muted border-2">
                        <div className="h-2 w-2 rounded-full bg-primary/50"></div>
                    </div>
                    <div className="ml-6">
                      <p className="text-sm">{stop.station_name}</p>
                      <p className="text-xs">Arrival: {stop.actual_arrival_time}</p>
                    </div>
                  </div>
                ))}
                 <div className="relative flex items-start pb-8 last:pb-0 font-bold text-primary">
                    <div className="absolute left-[-0.375rem] top-[0.125rem] h-full w-px bg-border"></div>
                    <div className="absolute left-[-0.75rem] top-0 h-6 w-6 rounded-full flex items-center justify-center bg-primary ring-4 ring-primary/20">
                      <div className="h-2 w-2 rounded-full bg-primary-foreground"></div>
                    </div>
                    <div className="ml-6">
                      <p className="text-sm">{trainData.current_station_name}</p>
                      <p className="text-xs text-muted-foreground">Arrival: {trainData.current_eta}</p>
                    </div>
                  </div>
                {trainData.upcoming_stations.map((stop: any, index: number) => (
                  <div key={index} className="relative flex items-start pb-8 last:pb-0">
                    <div className="absolute left-[-0.375rem] top-[0.125rem] h-full w-px bg-border"></div>
                    <div className="absolute left-[-0.75rem] top-0 h-6 w-6 rounded-full flex items-center justify-center bg-muted border-2"></div>
                    <div className="ml-6">
                      <p className="text-sm">{stop.station_name}</p>
                      <p className="text-xs text-muted-foreground">Arrival: {stop.expected_arrival_time}</p>
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
