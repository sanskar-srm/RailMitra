"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search } from 'lucide-react';

export default function LiveStation() {
  const [station, setStation] = useState('');
  const [stationName, setStationName] = useState('');
  const [arrivals, setArrivals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!station) return;
    setLoading(true);
    setArrivals([]);
    // Mock API call
    setTimeout(() => {
      setStationName(station);
      setArrivals([
        { train: '12951 Mumbai Rajdhani', eta: '00:22', platform: '2', status: 'On Time' },
        { train: '19019 Dehradun Exp', eta: '00:35', platform: '1', status: 'Delayed 10m' },
        { train: '22941 Indore Exp', eta: '01:05', platform: '3', status: 'On Time' },
        { train: '12415 Intercity Exp', eta: '01:20', platform: '4', status: 'Arrived' },
        { train: '20957 INDB-NDLS SF', eta: '01:50', platform: '2', status: 'Departed' },
      ]);
      setLoading(false);
    }, 1500);
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
              <Label htmlFor="station-name" className="sr-only">Station Name or Code</Label>
              <Input
                id="station-name"
                placeholder="e.g., NDLS or New Delhi"
                value={station}
                onChange={(e) => setStation(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              <Search className="mr-2 h-4 w-4" /> {loading ? 'Searching...' : 'Search'}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {loading && <div className="text-center p-8"><p>Loading station data...</p></div>}

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
                  <TableHead className="text-center">ETA/ETD</TableHead>
                  <TableHead className="text-center">Platform</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {arrivals.map((arrival, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{arrival.train}</TableCell>
                    <TableCell className="text-center">{arrival.eta}</TableCell>
                    <TableCell className="text-center">{arrival.platform}</TableCell>
                    <TableCell className="text-right">
                      <Badge 
                        variant={
                          arrival.status.includes('Delayed') ? 'destructive' : 
                          arrival.status.includes('On Time') ? 'default' : 
                          'secondary'
                        }
                        className="capitalize"
                      >
                        {arrival.status}
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
