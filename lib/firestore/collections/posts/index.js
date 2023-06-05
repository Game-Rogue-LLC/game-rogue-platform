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

// Read and Write data to Organization Collection
const read = async () => {
  return new Promise((resolve, reject) => {
    try {
      const dbRef = collection(db, "posts");
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

const readAll = async (appendData, endLoading) => {
  return new Promise((resolve, reject) => {
    try {
      const dbRef = collection(db, "posts");
      const q = query(dbRef, where("deleted", "==", false));
      const unsubscribe = onSnapshot(q, async (querySnap) => {
        let temp = {};
        querySnap.forEach((doc) => {
          const dat = doc.data();
          temp[doc.id] = {
            ...dat,
            id: doc.id,
            createdAt: dat.createdAt ? dat.createdAt.toDate() : new Date()
          };
        });
        appendData(temp);
        endLoading();
        resolve({
          code: "succeed",
          last: querySnap.docs[querySnap.docs.length - 1],
          unsubscribe
        });
      });
    } catch (err) {
      endLoading();
      reject({
        code: "failed",
        message: err.message
      });
    }
  });
};

const readA = async (offset, lim) => {
  return new Promise((resolve, reject) => {
    try {
      const dbRef = collection(db, "posts");
      let q;
      if (!offset)
        q = query(dbRef, where("deleted", "==", false), orderBy("createdAt"), limit(lim));
      else
        q = query(
          dbRef,
          where("deleted", "==", false),
          orderBy("createdAt", "desc"),
          startAfter(offset),
          limit(lim)
        );
      getDocs(q)
        .then((querySnap) => {
          let temp = {};
          querySnap.forEach((doc) => {
            const dat = doc.data();
            temp[doc.id] = {
              ...dat,
              id: doc.id,
              createdAt: dat.createdAt ? dat.createdAt.toDate() : new Date()
            };
          });
          resolve({
            code: "succeed",
            data: temp,
            last: querySnap.docs[querySnap.docs.length - 1]
          });
        })
        .catch((err) => {
          console.error(err);
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

const save = async (id, data) => {
  try {
    if (id) {
      const docRef = doc(db, "posts", id);
      await setDoc(docRef, { ...data }, { merge: true });
      const docSnap = await getDoc(docRef);
      return {
        code: "succeed",
        data: {
          id: docRef.id,
          ...docSnap.data()
        },
        message: "Posting saved successfully!"
      };
    } else {
      const dbRef = collection(db, "posts");
      const docRef = await addDoc(dbRef, { ...data });
      const docSnap = await getDoc(docRef);
      return {
        code: "succeed",
        data: {
          id: docRef.id,
          ...docSnap.data()
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

// Upload files to Firestore
function uploadFile(file, id, name) {
  return new Promise((resolve, reject) => {
    // create a storage ref
    const storageRef = ref(storage, "user/" + id + "/" + name + "." + file.type.split("/")[1]);

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
  readA,
  readAll,
  save,
  uploadFile
};
