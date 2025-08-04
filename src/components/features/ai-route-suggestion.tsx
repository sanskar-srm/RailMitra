"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { suggestAlternativeRoutes, type SuggestAlternativeRoutesOutput } from '@/ai/flows/suggest-alternative-routes';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Bot, Bus, TrainFront, Plane, Loader2, Clock, IndianRupee, Route } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  trainNumber: z.string().min(1, 'Train number is required'),
  currentLocation: z.string().min(1, 'Current location is required'),
  destination: z.string().min(1, 'Destination is required'),
  delayReason: z.string().min(1, 'Delay reason is required'),
  delayInMinutes: z.coerce.number().min(0, 'Delay must be a positive number'),
});

export default function AiRouteSuggestion() {
  const [suggestions, setSuggestions] = useState<SuggestAlternativeRoutesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trainNumber: '',
      currentLocation: '',
      destination: '',
      delayReason: 'Signal Failure',
      delayInMinutes: 60,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setSuggestions(null);
    try {
      const result = await suggestAlternativeRoutes(values);
      setSuggestions(result);
    } catch (e) {
      setError('Failed to get suggestions. Please try again later.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  const getTransportIcon = (mode: string) => {
    if (mode.toLowerCase().includes('bus')) return <Bus className="h-5 w-5 text-primary" />;
    if (mode.toLowerCase().includes('train')) return <TrainFront className="h-5 w-5 text-primary" />;
    if (mode.toLowerCase().includes('flight')) return <Plane className="h-5 w-5 text-primary" />;
    return <Route className="h-5 w-5 text-primary" />;
  };

  return (
    <div className="space-y-8 animate-in fade-in-50">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bot /> AI Route Suggestion</CardTitle>
          <CardDescription>Train delayed or cancelled? Fill in the details to find the best alternative routes powered by AI.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField control={form.control} name="trainNumber" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Train Number</FormLabel>
                    <FormControl><Input placeholder="e.g., 12951" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="delayInMinutes" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delay in Minutes</FormLabel>
                    <FormControl><Input type="number" placeholder="e.g., 120" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="currentLocation" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Location</FormLabel>
                    <FormControl><Input placeholder="e.g., Ratlam" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="destination" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination</FormLabel>
                    <FormControl><Input placeholder="e.g., New Delhi" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="delayReason" render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Reason for Delay/Cancellation</FormLabel>
                    <FormControl><Input placeholder="e.g., Track maintenance" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <Button type="submit" disabled={isLoading} size="lg">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
                {isLoading ? 'Thinking...' : 'Get AI Suggestions'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {error && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
      
      {suggestions && suggestions.alternativeRoutes.length > 0 && (
        <Card className="animate-in fade-in-50">
          <CardHeader>
            <CardTitle>AI-Powered Alternative Routes</CardTitle>
            <CardDescription>Here are some other ways to reach your destination.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
              {suggestions.alternativeRoutes.map((route, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-lg">
                    <div className="flex items-center gap-4">
                      {getTransportIcon(route.modeOfTransport)}
                      <span>Option {index + 1}: {route.modeOfTransport}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <p className="text-muted-foreground">{route.routeDescription}</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm pt-2">
                      <div className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> <strong>Travel Time:</strong> {route.travelTime}</div>
                      <div className="flex items-center gap-1.5"><IndianRupee className="h-4 w-4" /> <strong>Est. Cost:</strong> {route.cost || 'N/A'}</div>
                    </div>
                    <p className="text-sm pt-2"><strong>Estimated Arrival:</strong> <span className="font-semibold text-primary">{route.estimatedArrivalTime}</span></p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
