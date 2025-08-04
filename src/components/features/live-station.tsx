"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search } from 'lucide-react';
import { getLiveStationStatus, type GetLiveStationStatusOutput } from '@/ai/flows/get-live-station-status';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function LiveStation() {
  const [station, setStation] = useState('');
  const [stationName, setStationName] = useState('');
  const [arrivals, setArrivals] = useState<GetLiveStationStatusOutput['trains']>([]);
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
      setArrivals(result.trains);
      setStationName(station.toUpperCase());
    } catch (err) {
      console.error(err);
      setError("Failed to fetch station data. Please check the station code and your API key.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-8 animate-in fade-in-50">
      <Card>
        <CardHeader>
          <CardTitle>Live Station Arrivals & Departures</CardTitle>
          <CardDescription>Check trains arriving at or departing from a station in the next few hours.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow">
              <Label htmlFor="station-name" className="sr-only">Station Code</Label>
              <Input
                id="station-name"
                placeholder="e.g., NDLS for New Delhi"
                value={station}
                onChange={(e) => setStation(e.target.value)}
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
      
      {loading && <div className="text-center p-8"><Loader2 className="h-8 w-8 animate-spin mx-auto" /><p className="mt-2">Loading station data...</p></div>}

      {arrivals.length > 0 && (
        <Card className="animate-in fade-in-50">
          <CardHeader>
            <CardTitle>Live Status for {stationName}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Train</TableHead>
                  <TableHead className="text-center">Arrival</TableHead>
                  <TableHead className="text-center">Platform</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {arrivals.map((arrival) => (
                  <TableRow key={arrival.TrainNo}>
                    <TableCell className="font-medium">{arrival.TrainName} ({arrival.TrainNo})</TableCell>
                    <TableCell className="text-center">{arrival.ActArrTime}</TableCell>
                    <TableCell className="text-center">{arrival.Platform ?? 'N/A'}</TableCell>
                    <TableCell className="text-right">
                       <Badge 
                        variant={
                          arrival.Status.includes('CANCELLED') ? 'destructive' :
                          arrival.Status.includes('ON TIME') ? 'default' :
                          'secondary'
                        }
                        className="capitalize"
                      >
                        {arrival.Status}
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
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">No train data found for station {stationName}. It might be an invalid code or there are no trains in the next few hours.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
