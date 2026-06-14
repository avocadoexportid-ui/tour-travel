import { createClient } from "@/lib/supabase-server";
import { cookies } from "next/headers";
import { Badge } from "@/components/ui/badge";

export default async function AdminDashboard() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const { data: bookings } = await supabase
    .from("bookings")
    .select("*, tours(title)") // Join tabel
    .order("created_at", { ascending: false });

  async function updateStatus(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const status = formData.get("status") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.from("bookings").update({ status }).eq("id", id);
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold mb-6">Kelola Booking</h1>
      <div className="bg-white rounded-xl shadow p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="pb-3 font-medium text-gray-500">Kode</th>
              <th className="pb-3 font-medium text-gray-500">Tour</th>
              <th className="pb-3 font-medium text-gray-500">Pemesan</th>
              <th className="pb-3 font-medium text-gray-500">Status</th>
              <th className="pb-3 font-medium text-gray-500">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((b: any) => (
              <tr key={b.id} className="border-b last:border-0">
                <td className="py-4 font-mono text-sm">{b.id.slice(0,8)}</td>
                <td className="py-4">{b.tours?.title}</td>
                <td className="py-4">{b.customer_name}</td>
                <td className="py-4">
                  <Badge variant={b.status === "lunas" ? "default" : b.status === "batal" ? "destructive" : "secondary"}>
                    {b.status}
                  </Badge>
                </td>
                <td className="py-4 flex gap-2">
                  <form action={updateStatus}>
                    <input type="hidden" name="id" value={b.id} />
                    <input type="hidden" name="status" value="lunas" />
                    <button type="submit" className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Set Lunas</button>
                  </form>
                  <form action={updateStatus}>
                    <input type="hidden" name="id" value={b.id} />
                    <input type="hidden" name="status" value="batal" />
                    <button type="submit" className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Batalkan</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
