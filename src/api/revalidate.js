// pages/api/revalidate.js
export default async function handler(req, res) {
  const { id, updatedAt } = req.query;

  // 任意の条件で再生成を実行
  if (updatedAt) {
      try {
          await res.unstable_revalidate(`/blog/${id}`);
          return res.json({ revalidated: true });
      } catch (err) {
          return res.status(500).json({ message: 'Error revalidating' });
      }
  } else {
      return res.status(400).json({ message: 'No update detected' });
  }
}