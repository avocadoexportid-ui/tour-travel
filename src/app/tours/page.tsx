import { createClient } from "@/lib/supabase-server";
import { cookies } from "next/headers";
import { TourFilterSidebar } from "@/components/FilterSidebar";
import { TourCard } from "@/components/TourCard";

// Komponen halaman secara default adalah Server Component
// Search params didapat dari URL ?location=Bali&sort=cheapest
export default async function ToursPage({ searchParams }: { searchParams: { location?: string, sort?: string, minPrice?: string, maxPrice?: string } }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let query = supabase.from("tours").select("*");

  // Filtering logic
  if (searchParams.location) query = query.eq("location", searchParams.location);
  if (searchParams.minPrice) query = query.gte("price", Number(searchParams.minPrice));
  if (searchParams.maxPrice) query = query.lte("price", Number(searchParams.maxPrice));
  
  // Sorting logic
  if (searchParams.sort === "cheapest") query = query.order("price", { ascending: true });
  else if (searchParams.sort === "popular") query = query.order("rating", { ascending: false });
  else query = query.order("created_at", { ascending: false }); // Terbaru

  const { data: tours } = await query;

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="font-heading text-4xl font-bold mb-8">Jelajahi Destinasi</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4">
          <TourFilterSidebar />
        </aside>
        <main className="w-full md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours?.map((tour) => <TourCard key={tour.id} tour={tour} />)}
          </div>
        </main>
      </div>
    </div>
  );
}
