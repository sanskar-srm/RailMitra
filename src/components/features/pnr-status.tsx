"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, Ticket, Users, CheckCircle, Clock, TrainFront } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function PnrStatus() {
  const [pnr, setPnr] = useState('');
  const [pnrData, setPnrData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pnr || pnr.length !== 10) return;
    setLoading(true);
    setPnrData(null);
    // Mock API call
    setTimeout(() => {
      setPnrData({
        pnr: pnr,
        trainName: 'Shatabdi Express',
        trainNumber: '12002',
        from: 'New Delhi (NDLS)',
        to: 'Bhopal (BPL)',
        dateOfJourney: '2024-12-25',
        class: 'AC Chair Car (CC)',
        passengers: [
          { number: 1, status: 'CNF', coach: 'C4', berth: '32' },
          { number: 2, status: 'CNF', coach: 'C4', berth: '33' },
          { number: 3, status: 'WL', coach: 'N/A', berth: '1' },
        ],
        chartPrepared: true,
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in-50">
      <Card>
        <CardHeader>
          <CardTitle>PNR Status Check</CardTitle>
          <CardDescription>Enter your 10-digit PNR number to check your ticket status.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow">
              <Label htmlFor="pnr-number" className="sr-only">PNR Number</Label>
              <Input
                id="pnr-number"
                placeholder="Enter 10-digit PNR"
                value={pnr}
                onChange={(e) => setPnr(e.target.value)}
                maxLength={10}
                pattern="[0-9]{10}"
                title="PNR must be 10 digits"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              <Search className="mr-2 h-4 w-4" /> {loading ? 'Checking...' : 'Check Status'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {loading && <div className="text-center p-8"><p>Checking PNR status...</p></div>}
      
      {pnrData && (
        <Card className="animate-in fade-in-50">
          <CardHeader>
            <CardTitle>Booking Details for PNR: {pnrData.pnr}</CardTitle>
            <CardDescription className="flex items-center gap-2 pt-2">
              <TrainFront className="h-4 w-4"/> {pnrData.trainName} ({pnrData.trainNumber}) | Date of Journey: {pnrData.dateOfJourney}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-6 text-sm">
                <div><span className="text-muted-foreground">From:</span><p className="font-semibold">{pnrData.from}</p></div>
                <div><span className="text-muted-foreground">To:</span><p className="font-semibold">{pnrData.to}</p></div>
                <div><span className="text-muted-foreground">Class:</span><p className="font-semibold">{pnrData.class}</p></div>
            </div>
            
            <Separator />

            <div className="mt-6">
                <h3 className="font-semibold flex items-center gap-2 mb-4 text-lg"><Users /> Passenger Status</h3>
                <div className="space-y-3">
                    {pnrData.passengers.map((p: any, i: number) => (
                        <div key={i} className="flex flex-wrap justify-between items-center bg-secondary p-3 rounded-lg">
                            <p className="font-medium">Passenger {p.number}</p>
                            <p className={`font-bold ${p.status === 'CNF' ? 'text-green-600' : 'text-orange-500'}`}>{p.status}</p>
                            <p className="text-muted-foreground">
                              {p.status === 'CNF' ? `Coach: ${p.coach}, Berth: ${p.berth}` : `Waiting List: ${p.berth}`}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className={`flex items-center gap-2 text-sm ${pnrData.chartPrepared ? 'text-green-600' : 'text-muted-foreground'}`}>
                {pnrData.chartPrepared ? <CheckCircle /> : <Clock />}
                <span>{pnrData.chartPrepared ? 'Charting is Done' : 'Charting Not Prepared'}</span>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
