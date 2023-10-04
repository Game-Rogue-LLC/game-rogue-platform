import {
  DEFAULT_CONTENTBLOCK_IMAGE,
  DEFAULT_DARK_LOGO,
  DEFAULT_LIGHT_LOGO
} from "@/src/config/global";
import {
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
import { db, storage } from "@/lib/firebase/initFirebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const model = {
  uid: "",
  oldPosition: "",
  newPosition: "",
  oldOrganization: "",
  compensation: "",
  createdAt: new Date(),
  deleted: false
};

export const rules = {};

export const customMessages = {};

// Read and Write data to Staffs Collection
const read = async (setData, endLoading) => {
  try {
    const dbRef = collection(db, "staffs");
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
  } catch (error) {
    console.warn(error);
    endLoading();
  }
};

const save = async (id, data) => {
  try {
    if (id) {
      const docRef = doc(db, "staffs", id);
      await setDoc(docRef, { ...data }, { merge: true });
      return {
        code: "succeed",
        message: "Staff data saved successfully!"
      };
    } else {
      const dbRef = collection(db, "staffs");
      const docRef = await addDoc(dbRef, { ...data });
      return {
        code: "succeed",
        id: docRef.id,
        message: "Staff data saved successfully!"
      };
    }
  } catch (error) {
    return {
      code: "failed",
      message: error.message
    };
  }
};

const rogueIdExists = async (_id) => {
  try {
    const dbRef = collection(db, "staffs");
    const q = query(dbRef, where("_id", "==", _id));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.empty);
    if (querySnapshot.empty) {
      return {
        code: "failed",
        message: "Staff does not exist."
      };
    }
    return {
      code: "succeed",
      message: "Succeed!"
    };
  } catch (err) {
    return {
      code: "failed",
      message: err.message
    };
  }
};

// Upload files to Firestore
function uploadFile(file, id) {
  return new Promise((resolve, reject) => {
    // create a storage ref
    const storageRef = ref(storage, "staff/" + id + "." + file.type.split("/")[1]);

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
  rogueIdExists,
  uploadFile
};
