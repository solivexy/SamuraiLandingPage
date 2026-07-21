import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url || !url.includes('private.blob.vercel-storage.com')) {
    return new NextResponse('Invalid URL', { status: 400 });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return new NextResponse('Missing BLOB_READ_WRITE_TOKEN', { status: 500 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return new NextResponse('Error fetching blob', { status: response.status });
    }

    const headers = new Headers();
    if (response.headers.has('content-type')) headers.set('content-type', response.headers.get('content-type')!);
    if (response.headers.has('content-length')) headers.set('content-length', response.headers.get('content-length')!);
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    return new NextResponse(response.body, {
      status: 200,
      headers,
    });
  } catch {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
