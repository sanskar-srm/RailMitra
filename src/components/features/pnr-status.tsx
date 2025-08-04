"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, Ticket, Users, CheckCircle, Clock, TrainFront, Loader2 } from 'lucide-react';
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
    <div className="space-y-6">
       <form onSubmit={handleSearch} className="flex items-center gap-2 bg-white/10 p-2 rounded-lg">
            <Input
                id="pnr-number"
                placeholder="Enter 10-digit PNR"
                value={pnr}
                onChange={(e) => setPnr(e.target.value)}
                maxLength={10}
                pattern="[0-9]{10}"
                title="PNR must be 10 digits"
                className="bg-transparent border-none text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button type="submit" disabled={loading} className="bg-white text-black hover:bg-gray-200">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search />}
              {loading ? '' : 'Search'}
            </Button>
        </form>

      {loading && <div className="text-center p-8"><p>Checking PNR status...</p></div>}
      
      {pnrData && (
        <Card className="animate-in fade-in-50 bg-white/5 border-white/10 text-white">
          <CardHeader>
            <CardTitle>Booking Details for PNR: {pnrData.pnr}</CardTitle>
            <CardDescription className="flex items-center gap-2 pt-2 text-gray-400">
              <TrainFront className="h-4 w-4"/> {pnrData.trainName} ({pnrData.trainNumber}) | Date of Journey: {pnrData.dateOfJourney}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-6 text-sm">
                <div><span className="text-gray-400">From:</span><p className="font-semibold">{pnrData.from}</p></div>
                <div><span className="text-gray-400">To:</span><p className="font-semibold">{pnrData.to}</p></div>
                <div><span className="text-gray-400">Class:</span><p className="font-semibold">{pnrData.class}</p></div>
            </div>
            
            <Separator className="bg-white/10" />

            <div className="mt-6">
                <h3 className="font-semibold flex items-center gap-2 mb-4 text-lg"><Users /> Passenger Status</h3>
                <div className="space-y-3">
                    {pnrData.passengers.map((p: any, i: number) => (
                        <div key={i} className="flex flex-wrap justify-between items-center bg-white/5 p-3 rounded-lg">
                            <p className="font-medium">Passenger {p.number}</p>
                            <p className={`font-bold ${p.status === 'CNF' ? 'text-green-400' : 'text-orange-400'}`}>{p.status}</p>
                            <p className="text-gray-400">
                              {p.status === 'CNF' ? `Coach: ${p.coach}, Berth: ${p.berth}` : `Waiting List: ${p.berth}`}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className={`flex items-center gap-2 text-sm ${pnrData.chartPrepared ? 'text-green-400' : 'text-gray-400'}`}>
                {pnrData.chartPrepared ? <CheckCircle /> : <Clock />}
                <span>{pnrData.chartPrepared ? 'Charting is Done' : 'Charting Not Prepared'}</span>
            </div>
          </CardFooter>
        </Card>
      )}

      {!loading && !pnrData && (
         <Card className="bg-white/5 border-white/10 text-white">
          <CardContent className="p-6">
             <p className="text-center text-gray-400">Enter a PNR to check ticket status.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
