import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req) {
    const body = await req.json();
    const { api, id } = body;

    console.log('Received revalidate request:', { api, id });

    // blog APIの場合にのみキャッシュ更新を行う
    if (api === 'blog' && id) {
        try {
            await revalidatePath(`/blog/${id}`);  // IDに基づいて個別記事ページを再生成
            console.log(`Revalidation successful for blog post: /blog/${id}`);
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