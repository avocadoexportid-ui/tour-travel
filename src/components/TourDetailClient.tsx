"use client";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatRupiah } from "@/lib/utils";
import { Check, X, CalendarDays, Users } from "lucide-react";
import Link from "next/link";

export function TourDetailClient({ tour }: { tour: any }) {
  const [pax, setPax] = useState(1);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Kolom Kiri (Detail) */}
        <div className="lg:col-span-2">
          {/* Gallery 4 Kolom */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8 rounded-xl overflow-hidden h-[400px]">
            {tour.images.map((img: string, i: number) => (
              <div key={i} className={`${i === 0 ? 'col-span-2 row-span-2' : ''} bg-gray-200`}>
                <img src={img} className="w-full h-full object-cover" alt={`${tour.title} ${i+1}`} />
              </div>
            ))}
          </div>

          <h1 className="font-heading text-3xl font-bold mb-2">{tour.title}</h1>
          <div className="flex gap-4 text-gray-600 mb-6">
            <span className="flex items-center gap-1"><MapPin size={16}/> {tour.location}</span>
            <span className="flex items-center gap-1"><CalendarDays size={16}/> {tour.duration_days}H {tour.duration_nights}M</span>
            <span className="flex items-center gap-1"><Users size={16}/> Kuota {tour.max_quota}</span>
          </div>

          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6">
              <p className="text-gray-700 leading-relaxed mb-8">{tour.description}</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="font-bold mb-4 text-green-800">Termasuk</h3>
                  <ul className="space-y-2">
                    {tour.includes.map((item: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-sm"><Check size={16} className="text-green-600"/> {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 p-6 rounded-xl">
                  <h3 className="font-bold mb-4 text-red-800">Tidak Termasuk</h3>
                  <ul className="space-y-2">
                    {tour.excludes.map((item: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-sm"><X size={16} className="text-red-600"/> {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="itinerary" className="mt-6">
              <Accordion type="single" collapsible>
                {tour.itinerary.map((day: any, i: number) => (
                  <AccordionItem key={i} value={`day-${i+1}`}>
                    <AccordionTrigger>Hari {day.day}: {day.title}</AccordionTrigger>
                    <AccordionContent>{day.desc}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          </Tabs>
        </div>

        {/* Kolom Kanan (Sticky Booking Box) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white border shadow-xl rounded-2xl p-6">
            <h2 className="font-heading text-2xl font-bold text-primary mb-1">{formatRupiah(tour.price)} <span className="text-sm text-gray-500 font-normal">/orang</span></h2>
            
            <div className="my-6 space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">Tanggal Keberangkatan</label>
                <input type="date" className="w-full border rounded-lg p-2" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Jumlah Orang</label>
                <input type="number" min="1" max={tour.max_quota} value={pax} onChange={(e) => setPax(Number(e.target.value))} className="w-full border rounded-lg p-2" />
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">{formatRupiah(tour.price * pax)}</span>
              </div>
            </div>

            <Link href={`/booking/${tour.id}?pax=${pax}`} className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-bold block text-center">
              Booking Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
