import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore";
import { db, storage } from "@/lib/firebase/initFirebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const model = {
  name: "",
  deleted: false,
  createdAt: new Date()
};

export const rules = {
  name: "required"
};

export const customMessages = {
  "required.name": "Category Name is required."
};

// Read and Write data to Match Collection
const read = async (setData, endLoading) => {
  try {
    const dbRef = collection(db, "categories");
    const q = query(dbRef, where("deleted", "==", false));
    const unsubscribe = onSnapshot(q, async (querySnap) => {
      let temp = {};
      querySnap.forEach((doc) => {
        const dat = doc.data();
        temp[doc.id] = {
          ...model,
          ...dat,
          id: doc.id,
          createdAt: dat.createdAt ? dat.createdAt.toDate() : new Date()
        };
      });
      await setData(temp);
      endLoading();
    });
    return unsubscribe;
  } catch (err) {
    console.warn(err);
    endLoading();
  }
};

const save = async (id, data) => {
  try {
    if (id) {
      const docRef = doc(db, "categories", id);
      await setDoc(docRef, { ...data }, { merge: true });
      const dat = await getDoc(docRef);
      return {
        code: "succeed",
        data: {
          ...dat.data(),
          id
        },
        message: "Category data saved successfully!"
      };
    } else {
      const dbRef = collection(db, "categories");
      const docRef = await addDoc(dbRef, { ...data });
      const dat = await getDoc(docRef);
      return {
        code: "succeed",
        data: {
          ...dat.data(),
          id: docRef.id
        },
        message: "Category data saved successfully!"
      };
    }
  } catch (err) {
    return {
      code: "failed",
      message: err.message
    };
  }
};

const _delete = async (id) => {
  try {
    const docRef = doc(db, "categories", id);
    await deleteDoc(docRef);
    return {
      code: "succeed",
      message: "Category data deleted successfully!"
    };
  } catch (er) {
    return {
      code: "failed",
      message: err.message
    };
  }
};

export default {
  read,
  save,
  delete: _delete
};
