import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const updatedAt = searchParams.get('updatedAt');

    console.log('Received revalidate request:', { id, updatedAt });

    if (updatedAt) {
        try {
            await res.unstable_revalidate(`/blog/${id}`);
            console.log('Revalidation successful for:', `/blog/${id}`);
            return NextResponse.json({ revalidated: true });
        } catch (err) {
            console.error('Revalidation error:', err);
            return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
        }
    } else {
        console.warn('No update detected in revalidate request');
        return NextResponse.json({ message: 'No update detected' }, { status: 400 });
    }
}