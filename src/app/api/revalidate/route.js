import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(req) {
    const body = await req.json();
    const api = body.api;
    const id = body.id;

    console.log('Received revalidate request:', { api, id });

    if (api === 'blog') {
        try {
            // 一覧ページ用のキャッシュタグを再生成
            await revalidateTag('blog');
            console.log('Revalidation successful for blog list');

            // 個別記事用のキャッシュタグを再生成
            if (id) {
                await revalidateTag(`blog_${id}`);
                console.log(`Revalidation successful for blog post with id: ${id}`);
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