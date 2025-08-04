import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const cancelledTrains = [
  { number: '12345', name: 'Ganga Sutlej Express', start: 'Haridwar', end: 'Prayagraj' },
  { number: '54321', name: 'Meerut Link Express', start: 'Bareilly', end: 'Aligarh' },
  { number: '09876', name: 'Holi Special', start: 'Patna', end: 'Anand Vihar' },
];

const rescheduledTrains = [
  { number: '12004', name: 'Lucknow Shatabdi', from: 'NDLS', to: 'LKO', oldTime: '16:30', newTime: '18:00' },
  { number: '22435', name: 'Vande Bharat Express', from: 'BSB', to: 'NDLS', oldTime: '15:00', newTime: '16:30' },
];

const divertedTrains = [
  { number: '12561', name: 'Swatantrata Senani Exp', newRoute: 'via Lucknow-Kanpur' },
  { number: '15097', name: 'Amarnath Express', newRoute: 'via Shahjahanpur-Bareilly' },
];

export default function TrainAlerts() {
  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div className="text-left">
        <h1 className="text-3xl font-bold">Train Alerts</h1>
        <p className="text-muted-foreground mt-1">Information on service disruptions as of today.</p>
      </div>
      <Tabs defaultValue="cancelled" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          <TabsTrigger value="rescheduled">Rescheduled</TabsTrigger>
          <TabsTrigger value="diverted">Diverted</TabsTrigger>
        </TabsList>
        <TabsContent value="cancelled">
          <Card>
            <CardHeader><CardTitle>Cancelled Trains</CardTitle><CardDescription>Trains that will not run today.</CardDescription></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Train No.</TableHead>
                    <TableHead>Train Name</TableHead>
                    <TableHead>Route</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cancelledTrains.map((train, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{train.number}</TableCell>
                      <TableCell>{train.name}</TableCell>
                      <TableCell>{train.start} - {train.end}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="rescheduled">
          <Card>
            <CardHeader><CardTitle>Rescheduled Trains</CardTitle><CardDescription>Trains with updated departure times.</CardDescription></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Train No.</TableHead>
                    <TableHead>Train Name</TableHead>
                    <TableHead>Original Time</TableHead>
                    <TableHead>New Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rescheduledTrains.map((train, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{train.number}</TableCell>
                      <TableCell>{train.name}</TableCell>
                      <TableCell>{train.oldTime}</TableCell>
                      <TableCell className="font-semibold text-primary">{train.newTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="diverted">
          <Card>
            <CardHeader><CardTitle>Diverted Trains</CardTitle><CardDescription>Trains running on an alternate route.</CardDescription></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Train No.</TableHead>
                    <TableHead>Train Name</TableHead>
                    <TableHead>New Route Info</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {divertedTrains.map((train, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{train.number}</TableCell>
                      <TableCell>{train.name}</TableCell>
                      <TableCell>{train.newRoute}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
