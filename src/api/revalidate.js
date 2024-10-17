export default async function handler(req, res) {
    // トークンによる認証（セキュリティ用）
    if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  
    try {
      // 指定のページのキャッシュをクリアして再生成
      await res.revalidate('/'); // '/'はトップページ。再生成したいパスを指定
      await res.revalidate('/news');
      if (req.query.newsId) {
        await res.revalidate(`/news/${req.query.newsId}`);
      }
      await res.revalidate('/blog');
      if (req.query.blogId) {
        await res.revalidate(`/blog/${req.query.blogId}`); // Revalidate specific blog posts if an ID is provided
      }
      return res.json({ revalidated: true });
    } catch (err) {
      return res.status(500).send('Error revalidating');
    }
  }