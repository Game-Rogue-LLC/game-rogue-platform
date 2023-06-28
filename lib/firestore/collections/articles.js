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

// Read and Write data to Organization Collection
const read = async () => {
  return new Promise((resolve, reject) => {
    try {
      const dbRef = collection(db, "articles");
      const q = query(dbRef, where("deleted", "==", false));
      getDocs(q)
        .then((querySnapshot) => {
          let temp = {};
          querySnapshot.docs.forEach((doc) => {
            const dat = doc.data();
            temp[doc.id] = {
              ...dat,
              id: doc.id,
              createdAt: dat.createdAt ? dat.createdAt.toDate() : new Date()
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

const save = async (id, data, merge) => {
  try {
    if (id) {
      const docRef = doc(db, "articles", id);
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
        message: "Saved successfully!"
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
        message: "Saved successfully!"
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
    const storageRef = ref(storage, "articles/" + id + "/" + name + "." + file.type.split("/")[1]);

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
