import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore";
import { db, firestore } from "@/lib/firebase/firebaseAdmin";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { nanoid } from "nanoid";
import player from "@/lib/firestore/collections/player";

// import { db, storage } from "@/lib/firebase/initFirebase";

export default async function handler(req, res) {
  try {
    const { id, data } = req.body;
    if (id) {
      console.log(id, data);
      firestore
        .collection("player")
        .doc(id)
        .set({ ...data }, { merge: true });
      const docRef = firestore.collection("player").doc(id);
      const docSnap = await docRef.get();
      console.log(docSnap.data());
      res.status(200).json({
        code: "succeed",
        data: docSnap.data(),
        message: "User data saved successfully!"
      });
    } else {
      const dbRef = firestore.collection("player");
      const docRef = await firestore.addDoc(dbRef, { ...data });
      const dat = await getDoc(docRef);
      res.status(200).json({
        code: "succeed",
        data: {
          id: docRef.id,
          ...dat
        }
      });
    }
  } catch (e) {
    res.status(200).json({ code: "failed", message: e });
  }
}
