
"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search } from 'lucide-react';
import { getLiveStationStatus } from '@/actions/get-live-station-status';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const demoArrivals = [
  { train_no: '12417', train_name: 'PRAYAGRAJ EXP', exp_arrival: '06:50', exp_departure: '07:00', platform_no: '1', delay: 'On Time' },
  { train_no: '12014', train_name: 'ASR SHTBDI EXP', exp_arrival: '07:20', exp_departure: '07:40', platform_no: '3', delay: '15m Late' },
  { train_no: '12259', train_name: 'SDAH DURONTO', exp_arrival: '08:15', exp_departure: '08:25', platform_no: '5', delay: 'On Time' },
  { train_no: '04004', train_name: 'DLI-SMI SPECIAL', exp_arrival: '08:50', exp_departure: '09:00', platform_no: '8', delay: 'Cancelled' },
];

export default function LiveStation() {
  const [station, setStation] = useState('');
  const [stationName, setStationName] = useState('');
  const [arrivals, setArrivals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!station) return;
    setLoading(true);
    setArrivals([]);
    setError(null);
    
    try {
      const result = await getLiveStationStatus({ stationCode: station });
      if (result.error) {
        throw new Error(result.error);
      }
      setArrivals(result.trains || []);
      setStationName(station.toUpperCase());
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch station data. Please check the station code and your API key.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex items-center gap-2 bg-white/10 p-2 rounded-lg">
          <Input
              id="station-name"
              placeholder="e.g., NDLS for New Delhi"
              value={station}
              onChange={(e) => setStation(e.target.value.toUpperCase())}
              className="bg-transparent border-none text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button type="submit" disabled={loading} className="bg-white text-black hover:bg-gray-200">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search />}
            {loading ? '' : 'Search'}
          </Button>
      </form>
      
      {error && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
      
      {loading && <div className="text-center p-8"><Loader2 className="h-8 w-8 animate-spin mx-auto" /><p className="mt-2">Loading station data...</p></div>}

      {arrivals.length > 0 && (
        <Card className="animate-in fade-in-50 bg-white/5 border-white/10 text-white">
          <CardHeader>
            <CardTitle>Live Status for {stationName}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-gray-400">Train</TableHead>
                  <TableHead className="text-center text-gray-400">Arrival</TableHead>
                  <TableHead className="text-center text-gray-400">Departure</TableHead>
                  <TableHead className="text-center text-gray-400">Platform</TableHead>
                  <TableHead className="text-right text-gray-400">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {arrivals.map((arrival) => (
                  <TableRow key={arrival.train_no} className="border-white/10">
                    <TableCell className="font-medium">{arrival.train_name} ({arrival.train_no})</TableCell>
                    <TableCell className="text-center">{arrival.exp_arrival}</TableCell>
                    <TableCell className="text-center">{arrival.exp_departure}</TableCell>
                    <TableCell className="text-center">{arrival.platform_no ?? 'N/A'}</TableCell>
                    <TableCell className="text-right">
                       <Badge 
                        variant={
                          arrival.delay && arrival.delay.toLowerCase().includes('cancel') ? 'destructive' :
                          arrival.delay && (arrival.delay.toLowerCase().includes('on time') || arrival.delay.toLowerCase().includes('right time')) ? 'default' :
                          'secondary'
                        }
                        className={
                          arrival.delay && (arrival.delay.toLowerCase().includes('on time') || arrival.delay.toLowerCase().includes('right time'))
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : arrival.delay.toLowerCase().includes('cancel') ? "bg-red-500/10 text-red-400 border-red-500/20"
                          : "bg-orange-500/10 text-orange-400 border-orange-500/20"
                        }
                      >
                        {arrival.delay}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {!loading && !error && arrivals.length === 0 && stationName && (
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <p className="text-center text-gray-400">No train data found for station {stationName}. It might be an invalid code or there are no trains in the next few hours.</p>
          </CardContent>
        </Card>
      )}

       {!loading && !error && arrivals.length === 0 && !stationName && (
        <Card className="bg-white/5 border-white/10 text-white">
           <CardHeader>
            <CardTitle>Live Status for NEW DELHI (NDLS)</CardTitle>
            <CardDescription>Showing demo data. Search for a station code to see live results.</CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-gray-400">Train</TableHead>
                  <TableHead className="text-center text-gray-400">Arrival</TableHead>
                  <TableHead className="text-center text-gray-400">Departure</TableHead>
                  <TableHead className="text-center text-gray-400">Platform</TableHead>
                  <TableHead className="text-right text-gray-400">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {demoArrivals.map((arrival) => (
                  <TableRow key={arrival.train_no} className="border-white/10">
                    <TableCell className="font-medium">{arrival.train_name} ({arrival.train_no})</TableCell>
                    <TableCell className="text-center">{arrival.exp_arrival}</TableCell>
                    <TableCell className="text-center">{arrival.exp_departure}</TableCell>
                    <TableCell className="text-center">{arrival.platform_no ?? 'N/A'}</TableCell>
                    <TableCell className="text-right">
                       <Badge 
                        variant={
                          arrival.delay && arrival.delay.toLowerCase().includes('cancel') ? 'destructive' :
                          arrival.delay && (arrival.delay.toLowerCase().includes('on time') || arrival.delay.toLowerCase().includes('right time')) ? 'default' :
                          'secondary'
                        }
                        className={
                          arrival.delay && (arrival.delay.toLowerCase().includes('on time') || arrival.delay.toLowerCase().includes('right time'))
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : arrival.delay.toLowerCase().includes('cancel') ? "bg-red-500/10 text-red-400 border-red-500/20"
                          : "bg-orange-500/10 text-orange-400 border-orange-500/20"
                        }
                      >
                        {arrival.delay}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
