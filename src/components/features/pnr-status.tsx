
"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Users, CheckCircle, Clock, TrainFront, Loader2, Dot } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { getPnrStatus } from '@/actions/get-pnr-status';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function PnrStatus() {
  const [pnr, setPnr] = useState('');
  const [pnrData, setPnrData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pnr || pnr.length !== 10) {
      setError("Please enter a valid 10-digit PNR number.");
      return;
    }
    setLoading(true);
    setPnrData(null);
    setError(null);

    try {
      const result = await getPnrStatus({ pnrNumber: pnr });
      if (result.error) throw new Error(result.error);
      setPnrData(result.data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch PNR data. Please check the PNR number.");
    } finally {
      setLoading(false);
    }
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

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading && (
        <div className="text-center p-8">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-2">Checking PNR status...</p>
        </div>
      )}

      {pnrData && (
        <Card className="animate-in fade-in-50 bg-white/5 border-white/10 text-white">
          <CardHeader>
            <CardTitle>Booking Details for PNR: {pnrData.pnr_number}</CardTitle>
            <CardDescription className="flex items-center gap-2 pt-2 text-gray-400">
              <TrainFront className="h-4 w-4" />
              {pnrData.train_name} ({pnrData.train_no}) | Date of Journey: {pnrData.doj}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-6 text-sm">
              <div>
                <span className="text-gray-400">From:</span>
                <p className="font-semibold">{pnrData.from_station?.name} ({pnrData.from_station?.code})</p>
              </div>
              <div>
                <span className="text-gray-400">To:</span>
                <p className="font-semibold">{pnrData.to_station?.name} ({pnrData.to_station?.code})</p>
              </div>
              <div>
                <span className="text-gray-400">Class:</span>
                <p className="font-semibold">{pnrData.journey_class}</p>
              </div>
            </div>

            <Separator className="bg-white/10" />

            <div className="mt-6">
              <h3 className="font-semibold flex items-center gap-2 mb-4 text-lg">
                <Users /> Passenger Status
              </h3>
              <div className="space-y-3">
                {pnrData.passenger_info && pnrData.passenger_info.map((p: any, i: number) => (
                  <div key={i} className="flex flex-wrap justify-between items-center bg-white/5 p-3 rounded-lg">
                    <p className="font-medium">Passenger {p.passenger}</p>
                    <p className={`font-bold ${p.current_status_code?.toLowerCase() === 'cnf' ? 'text-green-400' : 'text-orange-400'}`}>
                      {p.current_status}
                    </p>
                    <p className="text-gray-400">
                      {p.current_status_code?.toLowerCase() === 'cnf'
                        ? `Coach: ${p.current_coach}, Berth: ${p.current_berth_no}`
                        : `Booking Status: ${p.booking_status}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className={`flex items-center gap-2 text-sm ${pnrData.chart_prepared ? 'text-green-400' : 'text-gray-400'}`}>
              {pnrData.chart_prepared ? <CheckCircle /> : <Clock />}
              <span>{pnrData.chart_prepared ? 'Charting is Done' : 'Charting Not Prepared'}</span>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
