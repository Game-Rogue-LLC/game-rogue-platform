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

import { orderBy } from "lodash";

// Read and Write data to Match Collection
const read = (type, setData, endLoading) => {
  try {
    const dbRef = collection(db, "messages");
    const q = query(
      dbRef,
      where("deleted", "==", false),
      where("type", "==", type),
      orderBy("sentAt")
    );
    const unsubscribe = onSnapshot(q, async (querySnap) => {
      let temp = {};
      querySnap.forEach((doc) => {
        const dat = doc.data();
        temp[doc.id] = {
          ...dat,
          id: doc.id,
          sentAt: dat.sentAt ? dat.sentAt.toDate() : new Date()
        };
      });
      setData(temp);
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
      const docRef = doc(db, "messages", id);
      await setDoc(docRef, { ...data }, { merge: true });
      return {
        code: "succeed",
        message: "Message saved successfully!"
      };
    } else {
      const dbRef = collection(db, "messages");
      const docRef = await addDoc(dbRef, { ...data });
      return {
        code: "succeed",
        id: docRef.id,
        message: "Message saved successfully!"
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
    const docRef = doc(db, "messages", id);
    await deleteDoc(docRef);
    return {
      code: "succeed",
      message: "Message deleted successfully!"
    };
  } catch (er) {
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
    const storageRef = ref(storage, "match/" + id + "/" + name + "." + file.type.split("/")[1]);

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
  delete: _delete,
  uploadFile
};
