import { createClient } from "@/lib/supabase-server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { TourDetailClient } from "@/components/TourDetailClient";

export default async function TourDetailPage({ params }: { params: { slug: string } }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: tour } = await supabase
    .from("tours")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!tour) notFound();

  // Revalidate data setiap 1 jam
  return <TourDetailClient tour={tour} />;
}
