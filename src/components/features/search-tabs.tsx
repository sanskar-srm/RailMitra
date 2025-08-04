"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LiveTrainStatus from '@/components/features/live-train-status';
import PnrStatus from '@/components/features/pnr-status';
import LiveStation from '@/components/features/live-station';
import { Train, Ticket, Building } from 'lucide-react';

export default function SearchTabs() {
  return (
    <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
      <Tabs defaultValue="train-status" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-transparent p-0 mb-4">
          <TabsTrigger value="train-status" className="flex items-center gap-2 data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400">
            <Train className="h-4 w-4" />
            Train Status
          </TabsTrigger>
          <TabsTrigger value="pnr-status" className="flex items-center gap-2 data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400">
             <Ticket className="h-4 w-4" />
            PNR Status
          </TabsTrigger>
          <TabsTrigger value="live-station" className="flex items-center gap-2 data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-none text-gray-400">
             <Building className="h-4 w-4" />
            Live Station
          </TabsTrigger>
        </TabsList>
        <TabsContent value="train-status">
          <LiveTrainStatus />
        </TabsContent>
        <TabsContent value="pnr-status">
            <PnrStatus />
        </TabsContent>
        <TabsContent value="live-station">
            <LiveStation />
        </TabsContent>
      </Tabs>
    </div>
  );
}
