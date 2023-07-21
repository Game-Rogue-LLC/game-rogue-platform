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

import { DEFAULT_CONTENTBLOCK_IMAGE } from "@/src/config/global";

export const model = {
  name: "",
  description: "",
  banner: DEFAULT_CONTENTBLOCK_IMAGE,
  uid: "",
  primary: "#f5851f",
  secondary: "#ab5a15",
  tertiary: "#f5851f",
  categories: [],
  products: [],
  deleted: false,
  createdAt: new Date()
};

export const rules = {
  name: "required",
  description: "required"
};

export const customMessages = {
  "required.name": "Shop Name is required.",
  "required.description": "Description is required."
};

// Read and Write data to Match Collection
const read = async (setData, endLoading) => {
  try {
    const dbRef = collection(db, "shops");
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
      const docRef = doc(db, "shops", id);
      await setDoc(docRef, { ...data }, { merge: true });
      const dat = await getDoc(docRef);
      return {
        code: "succeed",
        data: {
          ...dat.data(),
          id
        },
        message: "Shop data saved successfully!"
      };
    } else {
      const dbRef = collection(db, "shops");
      const docRef = await addDoc(dbRef, { ...data });
      const dat = await getDoc(docRef);
      return {
        code: "succeed",
        data: {
          ...dat.data(),
          id: docRef.id
        },
        message: "Shop data saved successfully!"
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
    const docRef = doc(db, "shops", id);
    await deleteDoc(docRef);
    return {
      code: "succeed",
      message: "Shop data deleted successfully!"
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
    const storageRef = ref(storage, "shop/" + id + "/" + name + "." + file.type.split("/")[1]);

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
