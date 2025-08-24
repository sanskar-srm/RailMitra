
"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, TrainFront, Clock, MapPin, Gauge, Route, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
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
    if (!trainData?.upcoming_stations || !trainData?.previous_stations) return 0;
    const totalStations = trainData.previous_stations.length + trainData.upcoming_stations.length;
    if (totalStations === 0) return 0;
    const stationsPassed = trainData.previous_stations.length;
    return (stationsPassed / totalStations) * 100;
  }

  return (
    <div className="space-y-6">
        <form onSubmit={handleSearch} className="flex items-center gap-2 bg-white/10 p-2 rounded-lg">
            <Input
                id="train-number"
                placeholder="Enter train number or name"
                value={trainNumber}
                onChange={(e) => setTrainNumber(e.target.value)}
                className="bg-transparent border-none text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button type="submit" disabled={loading} className="bg-white text-black hover:bg-gray-200">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search />}
              {loading ? '' : 'Search'}
            </Button>
        </form>
      
      {error && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
      
      {loading && <div className="text-center p-8"><Loader2 className="h-8 w-8 animate-spin mx-auto" /><p className="mt-2">Loading train data...</p></div>}

      {trainData && (
        <Card className="animate-in fade-in-50 bg-white/5 border-white/10 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><TrainFront /> {trainData.train_name} ({trainData.train_number})</CardTitle>
            <CardDescription className="text-gray-400">Last updated: {trainData.updated_time}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="bg-white/5 p-3 rounded-lg"><p className="text-gray-400">Current Station</p><p className="font-semibold">{trainData.current_station_name}</p></div>
                <div className="bg-white/5 p-3 rounded-lg"><p className="text-gray-400">Next Station</p><p className="font-semibold">{trainData.upcoming_stations?.[0]?.station_name || 'Destination'}</p></div>
                <div className="bg-white/5 p-3 rounded-lg"><p className="text-gray-400">Delay</p><p className="font-semibold">{trainData.delay || 'On time'}</p></div>
                <div className="bg-white/5 p-3 rounded-lg"><p className="text-gray-400">Status</p><p className="font-semibold">{trainData.running_status}</p></div>
            </div>

            <div>
              <Label className="text-gray-400">Journey Progress</Label>
              <div className="relative mt-4">
                <div className="h-1 bg-white/10 rounded-full">
                  <div className="h-1 bg-green-500 rounded-full" style={{ width: `${getProgress()}%` }}></div>
                </div>
                <div
                  className="absolute -top-3 transition-all duration-500 ease-out"
                  style={{ left: `calc(${getProgress()}% - 12px)` }}
                >
                  <TrainFront className="h-6 w-6 text-green-400" />
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-4">
                <span>{trainData.source_station_name}</span>
                <span>{getProgress().toFixed(0)}% complete</span>
                <span>{trainData.destination_station_name}</span>
              </div>
            </div>

          </CardContent>
        </Card>
      )}

       {!loading && !error && !trainData && (
        <Card className="bg-white/5 border-white/10 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><TrainFront /> SHATABDI EXP (12001)</CardTitle>
            <CardDescription>Showing demo data. Search for a train to see live results.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="bg-white/5 p-3 rounded-lg"><p className="text-gray-400">Current Station</p><p className="font-semibold">BHOPAL JN</p></div>
                <div className="bg-white/5 p-3 rounded-lg"><p className="text-gray-400">Next Station</p><p className="font-semibold">AGRA CANTT</p></div>
                <div className="bg-white/5 p-3 rounded-lg"><p className="text-gray-400">Delay</p><p className="font-semibold text-red-400">39 Minutes</p></div>
                <div className="bg-white/5 p-3 rounded-lg"><p className="text-gray-400">Status</p><p className="font-semibold">Running</p></div>
            </div>

            <div>
              <Label className="text-gray-400 mt-6 block">Journey Progress</Label>
              <div className="relative mt-4">
                <div className="h-1 bg-white/10 rounded-full">
                  <div className="h-1 bg-green-500 rounded-full" style={{ width: `75%` }}></div>
                </div>
                <div
                  className="absolute -top-3"
                  style={{ left: `calc(75% - 12px)` }}
                >
                  <TrainFront className="h-6 w-6 text-green-400" />
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-4">
                <span>NEW DELHI</span>
                <span>75% complete</span>
                <span>MUMBAI CENTRAL</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
