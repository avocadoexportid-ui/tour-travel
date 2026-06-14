import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } })
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: { get: (name) => request.cookies.get(name)?.value, set: () => {} },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // Proteksi halaman admin dan booking
  if (request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/booking')) {
    if (!session) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    
    // Cek role admin untuk halaman admin
    if(request.nextUrl.pathname.startsWith('/admin')) {
      const { data: userProfile } = await supabase.from('users').select('role').eq('id', session.user.id).single();
      if(userProfile?.role !== 'admin') return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*', '/booking/:path*'],
}
