import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req) {
    const body = await req.json();
    const { api, id } = body;

    console.log('Received revalidate request:', { api, id });

    if (id) {
        try {
            if (api === 'blog') {
                await revalidatePath(`/blog/${id}`);
                console.log(`Revalidation successful for blog post: /blog/${id}`);
            } else if (api === 'news') {
                await revalidatePath(`/news/${id}`);
                console.log(`Revalidation successful for news post: /news/${id}`);
            } else {
                console.warn(`No revalidation performed. Unsupported API: ${api}`);
                return NextResponse.json({ message: 'Unsupported API' }, { status: 400 });
            }

            return NextResponse.json({ revalidated: true });
        } catch (err) {
            console.error('Revalidation error:', err);
            return NextResponse.json({ message: 'Error revalidating', error: err.message }, { status: 500 });
        }
    } else {
        console.warn('No update detected for revalidate request');
        return NextResponse.json({ message: 'No update detected' }, { status: 400 });
    }
}