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
import { DEFAULT_CONTENTBLOCK_IMAGE } from "@/src/config/global";

export const model = {
  name: "",
  description: "",
  uid: "",
  banner: DEFAULT_CONTENTBLOCK_IMAGE,
  categories: [],
  products: [],
  createdAt: new Date(),
  deleted: false
};

export const rules = {
  name: "required"
};

export const customMessages = {
  "required.name": "Shop Name is required."
};

// Read and Write data to Organization Collection
const read = async (setData, endLoading) => {
  try {
    const dbRef = collection(db, "shops");
    const q = query(dbRef, where("deleted", "==", false));
    const unsubscribe = onSnapshot(q, async (querySnap) => {
      let temp = {};
      querySnap.forEach((doc) => {
        const dat = doc.data();
        temp[doc.id] = {
          ...dat,
          id: doc.id,
          createdAt: doc.createdAt ? doc.createdAt.toDate() : new Date()
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

const save = async (id, data, merge) => {
  try {
    if (id) {
      const docRef = doc(db, "shops", id);
      if (merge === false) await setDoc(docRef, { ...data });
      else await setDoc(docRef, { ...data }, { merge: true });
      const docSnap = await getDoc(docRef);
      const dat = docSnap.data();
      return {
        code: "succeed",
        data: {
          id: docRef.id,
          ...dat,
          createdAt: dat.createdAt ? dat.createdAt.toDate() : new Date()
        },
        message: "Shop saved successfully!"
      };
    } else {
      const dbRef = collection(db, "shops");
      const docRef = await addDoc(dbRef, { ...data });
      const docSnap = await getDoc(docRef);
      const dat = docSnap.data();
      return {
        code: "succeed",
        data: {
          id: docRef.id,
          ...dat,
          createdAt: dat.createdAt ? dat.createdAt.toDate() : new Date()
        },
        message: "Shop saved successfully!"
      };
    }
  } catch (err) {
    return {
      code: "failed",
      message: err.message
    };
  }
};

// Upload files to Firestore
function uploadFile(file, id, name) {
  return new Promise((resolve, reject) => {
    // create a storage ref
    const storageRef = ref(storage, "shops/" + id + "/" + name + "." + file.type.split("/")[1]);

    // upload file
    const task = uploadBytesResumable(storageRef, file);

    // update progress bar
    task.on(
      "state_change",
      function progress(snapshot) {
        // setValue((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      },
      function error(err) {
        reject({
          code: "failed",
          message: err.message
        });
      },
      function complete() {
        getDownloadURL(storageRef)
          .then((url) =>
            resolve({
              code: "succeed",
              url
            })
          )
          .catch((err) =>
            reject({
              code: "failed",
              message: err.message
            })
          );
      }
    );
  });
}

export default {
  read,
  save,
  uploadFile
};
