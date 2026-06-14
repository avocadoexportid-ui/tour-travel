import { HeroSection } from "@/components/HeroSection";
import { SearchBox } from "@/components/SearchBox";
import { TourCard } from "@/components/TourCard";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { createClient } from "@/lib/supabase-server";
import { cookies } from "next/headers";

export default async function HomePage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  // Ambil data tour dari Supabase, fallback ke dummy
  const { data: tours } = await supabase.from("tours").select("*").limit(6);
  const finalTours = tours && tours.length > 0 ? tours : []; // Ganti dengan data dummy jika kosong

  return (
    <div>
      <HeroSection />
      <div className="container mx-auto px-4 -mt-12 relative z-10 mb-20">
        <SearchBox />
      </div>
      
      <section className="container mx-auto px-4 mb-24">
        <h2 className="font-heading text-3xl font-bold text-center mb-2">Destinasi Populer</h2>
        <p className="text-center text-gray-500 mb-10">Temukan perjalanan impianmu</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {finalTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </section>

      <WhyChooseUs />
      <TestimonialCarousel />

      {/* CTA Banner */}
      <section className="bg-navy py-20 text-center text-white">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-4xl font-bold mb-6">Siap Liburan?</h2>
          <p className="mb-8 text-lg opacity-90">Konsultasi perjalanan Anda secara GRATIS sekarang!</p>
          <a href="https://wa.me/6281234567890" target="_blank" className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-full font-bold text-lg inline-flex items-center gap-2 transition">
            Konsultasi Gratis WA
          </a>
        </div>
      </section>
    </div>
  );
}
