"use server";

import { createClient } from "@/lib/supabase-server";
import { cookies } from "next/headers";
import { z } from "zod";

// Skema validasi Zod
const bookingSchema = z.object({
  tour_id: z.number(),
  customer_name: z.string().min(3, "Nama minimal 3 karakter"),
  customer_email: z.string().email("Email tidak valid"),
  customer_phone: z.string().min(10, "Nomor telepon tidak valid"),
  total_price: z.number(),
  booking_date: z.string(),
  pax_count: z.number().min(1),
});

export async function createBooking(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { error: "Anda harus login untuk melakukan booking" };

  const rawFormData = {
    tour_id: Number(formData.get("tour_id")),
    customer_name: formData.get("name") as string,
    customer_email: formData.get("email") as string,
    customer_phone: formData.get("phone") as string,
    total_price: Number(formData.get("total_price")),
    booking_date: formData.get("date") as string,
    pax_count: Number(formData.get("pax")),
  };

  const validatedFields = bookingSchema.safeParse(rawFormData);
  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  const { error } = await supabase.from("bookings").insert({
    ...validatedFields.data,
    user_id: session.user.id,
    status: "pending"
  });

  if (error) return { error: "Gagal menyimpan booking" };

  return { success: true };
}
