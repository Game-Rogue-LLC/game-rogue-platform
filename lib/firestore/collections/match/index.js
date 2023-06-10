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

// Read and Write data to Match Collection
const readAll = async (eid, setData, endLoading) => {
  try {
    const dbRef = collection(db, "match");
    const q = query(dbRef, where("eid", "==", eid));
    const querySnap = await getDocs(q);
    let temp = [];
    querySnap.forEach((doc) => {
      const dat = doc.data();
      // temp[doc.id] = {
      //     ...dat,
      //     id: doc.id
      // }
      temp.push({
        ...dat,
        start: dat.start ? dat.start.toDate() : new Date(),
        end: dat.end ? dat.end.toDate() : new Date(),
        startTime: dat.start ? dat.start.toDate() : new Date(),
        createdAt: dat.createdAt ? dat.createdAt.toDate() : new Date()
      });
    });
    await setData(temp);
    endLoading();
  } catch (err) {
    console.warn(err);
    endLoading();
  }
};

const readA = async (eid, setData, endLoading) => {
  try {
    const dbRef = collection(db, "match");
    const q = query(dbRef, where("eid", "==", eid));
    const querySnap = await getDocs(q);
    let temp = [];
    querySnap.forEach((doc) => {
      const dat = doc.data();
      // temp[doc.id] = {
      //     ...dat,
      //     id: doc.id
      // }
      temp.push({
        ...dat,
        start: dat.start ? dat.start.toDate() : new Date(),
        end: dat.end ? dat.end.toDate() : new Date(),
        startTime: dat.start ? dat.start.toDate() : new Date(),
        createdAt: dat.createdAt ? dat.createdAt.toDate() : new Date()
      });
    });
    await setData(temp);
    endLoading();
  } catch (err) {
    console.warn(err);
    endLoading();
  }
};

const read = async (setData, endLoading) => {
  try {
    const dbRef = collection(db, "match");
    const q = query(dbRef, where("deleted", "==", false));
    const unsubscribe = onSnapshot(q, async (querySnap) => {
      let temp = [];
      querySnap.forEach((doc) => {
        const dat = doc.data();
        temp.push({
          ...dat,
          start: dat.start ? dat.start.toDate() : new Date(),
          end: dat.end ? dat.end.toDate() : new Date(),
          startTime: dat.start ? dat.start.toDate() : new Date(),
          createdAt: dat.createdAt ? dat.createdAt.toDate() : new Date()
        });
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
      const docRef = doc(db, "match", id);
      await setDoc(docRef, { ...data }, { merge: true });
      return {
        code: "succeed",
        message: "Match data saved successfully!"
      };
    } else {
      const dbRef = collection(db, "match");
      const docRef = await addDoc(dbRef, { ...data });
      return {
        code: "succeed",
        id: docRef.id,
        message: "Match data saved successfully!"
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
    const docRef = doc(db, "match", id);
    await deleteDoc(docRef);
    return {
      code: "succeed",
      message: "Match data deleted successfully!"
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
  readA,
  save,
  delete: _delete,
  uploadFile
};
