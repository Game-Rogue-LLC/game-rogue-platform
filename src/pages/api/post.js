import posts from "@/lib/firestore/collections/posts";

export default async function handler(req, res) {
  try {
    // const { offset, limit } = req.query;
    const result = await posts.read();
    res.status(200).json(result);
  } catch (e) {
    res.status(200).json({ code: "failed", message: e.message });
  }
}
