import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(req) {
    const body = await req.json();
    const api = body.api;
    const id = body.id;  // 受け取ったデータからidを取得

    console.log('Received revalidate request:', { api, id });

    // blog APIの場合にのみキャッシュ更新を行う
    if (api === 'blog') {
        try {
            await revalidateTag('blog');  // 一覧ページ全体に対応するタグ
            if (id) {
                // 個別ページも再生成するため、固有のタグを使用
                await revalidateTag(`blog_${id}`);
                console.log(`Revalidation successful for blog post with id: ${id}`);
            }
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