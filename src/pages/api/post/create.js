import { nanoid } from "nanoid";
import posts from "@/lib/firestore/collections/posts";

export default async function handler(req, res) {
  try {
    const result = await posts.save(null, req.body);
    res.status(200).json(result);
  } catch (e) {
    res.status(200).json({ code: "failed", message: e.message });
  }
}
