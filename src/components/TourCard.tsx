"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { formatRupiah } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";

export function TourCard({ tour }: { tour: any }) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Link href={`/tours/${tour.slug}`}>
        <Card className="overflow-hidden border-0 shadow-lg h-full flex flex-col">
          <div className="relative h-56 bg-gray-200">
            {/* Jika pakai Next Image, ganti dummy url dengan supabase image url */}
            <img src={tour.images[0]} alt={tour.title} className="w-full h-full object-cover" />
            <Badge className="absolute top-3 right-3 bg-primary">{tour.duration_days}H {tour.duration_nights}M</Badge>
          </div>
          <CardContent className="p-5 flex-1">
            <div className="flex items-center text-sm text-gray-500 mb-2 gap-1">
              <MapPin size={14} /> {tour.location}
            </div>
            <h3 className="font-heading font-semibold text-xl mb-2">{tour.title}</h3>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={16} fill="currentColor" />
              <span className="text-navy font-medium">{tour.rating}</span>
            </div>
          </CardContent>
          <CardFooter className="px-5 pb-5 pt-0 flex justify-between items-center">
            <div>
              <span className="text-xs text-gray-500">Mulai dari</span>
              <p className="text-primary font-bold text-lg font-heading">{formatRupiah(tour.price)}</p>
            </div>
            <span className="text-sm text-primary font-semibold hover:underline">Lihat Detail →</span>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
