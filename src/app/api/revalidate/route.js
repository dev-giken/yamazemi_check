import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(req) {
    const body = await req.json();
    const api = body.api;

    console.log('Received revalidate request:', { api });

    // blog APIの場合にのみキャッシュ更新を行う
    if (api === 'blog') {
        try {
            await revalidateTag('blog');  // blog全体に対応するタグを指定
            console.log('Revalidation successful for blog list');
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