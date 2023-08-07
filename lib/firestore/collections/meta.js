import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  startAfter,
  updateDoc,
  where
} from "firebase/firestore";
import { db, storage } from "@/lib/firebase/initFirebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import dayjs from "dayjs";

// Read and Write data to Meta Collection
const readAll = async () => {
  return new Promise((resolve, reject) => {
    try {
      const dbRef = collection(db, "meta");
      const q = query(dbRef);
      getDocs(q)
        .then((querySnapshot) => {
          let temp = {};
          querySnapshot.docs.forEach((doc) => {
            const dat = doc.data();
            temp[doc.id] = {
              ...dat,
              id: doc.id
            };
          });
          resolve({
            code: "succeed",
            data: temp
          });
        })
        .catch((err) => {
          reject({
            code: "failed",
            message: err.message
          });
        });
    } catch (err) {
      reject({
        code: "failed",
        message: err.message
      });
    }
  });
};

const read = async (key) => {
  return new Promise((resolve, reject) => {
    try {
      const docRef = doc(db, "meta", key);
      getDoc(docRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists() === true) {
            const rawData = docSnapshot.data();
            const data = {
              ...rawData,
              id: docSnapshot.id
            };
            resolve({
              code: "succeed",
              data: data
            });
          } else {
            reject({
              code: "failed",
              message: "Not found"
            });
          }
        })
        .catch((err) => {
          reject({
            code: "failed",
            message: err.message
          });
        });
    } catch (err) {
      reject({
        code: "failed",
        message: err.message
      });
    }
  });
};

const save = async (id, data, merge) => {
  try {
    if (id) {
      const docRef = doc(db, "meta", id);
      if (merge === false) await setDoc(docRef, { ...data });
      else await setDoc(docRef, { ...data }, { merge: true });
      const docSnap = await getDoc(docRef);
      const dat = docSnap.data();
      return {
        code: "succeed",
        data: {
          id: docRef.id,
          ...dat,
          createdAt: dat.createdAt ? dat.createdAt.toDate().toLocaleDateString() : new Date()
        },
        message: "Posting saved successfully!"
      };
    } else {
      const dbRef = collection(db, "posts");
      const docRef = await addDoc(dbRef, { ...data });
      const docSnap = await getDoc(docRef);
      const dat = docSnap.data();
      return {
        code: "succeed",
        data: {
          id: docRef.id,
          ...dat,
          createdAt: dat.createdAt ? dat.createdAt.toDate().toLocaleDateString() : new Date()
        },
        message: "Posting saved successfully!"
      };
    }
  } catch (err) {
    return {
      code: "failed",
      message: err.message
    };
  }
};

export default {
  read,
  readAll,
  save
};
