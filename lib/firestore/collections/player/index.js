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
import { db, storage } from "@/lib/firebase/initFirebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { DEFAULT_CONTENTBLOCK_IMAGE, DEFAULT_PROFILE_PICTURE } from "@/src/config/global";

export const model = {
  _id: "",
  name: "",
  banner: DEFAULT_CONTENTBLOCK_IMAGE,
  profilePic: DEFAULT_PROFILE_PICTURE,
  url: "https://gamerogue.com",
  userName: "",
  // gender: 0,
  birthday: new Date(),
  residency: {
    code: "US",
    label: "United States",
    phone: "1"
  },
  showAge: false
};

export const rules = {
  userName: "required"
};

export const customMessages = {
  "required.userName": "User Name is required."
};

// Read and Write data to Organization Collection
const readAll = async (setData, endLoading) => {
  try {
    const dbRef = collection(db, "player");
    const q = query(dbRef, where("deleted", "==", false));
    const unsubscribe = onSnapshot(q, async (querySnap) => {
      let temp = {};
      querySnap.forEach((doc) => {
        const dat = doc.data();
        temp[doc.id] = {
          ...model,
          ...dat,
          id: doc.id,
          birthday: dat.birthday ? dat.birthday.toDate() : new Date()
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

const getPlayerSnapshot = async (user, setData) => {
  try {
    const docRef = doc(db, "player", user.id);
    const unsubscribe = onSnapshot(docRef, async (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        await setData({
          ...model,
          ...data,
          id: doc.id,
          birthday: data.birthday?.toDate()
        });
      } else {
        await setDoc(docRef, { ...user }, { merge: true });
      }
    });
    return unsubscribe;
  } catch (err) {
    console.warn(err);
  }
};

const exists = async (uid) => {
  try {
    // const dbRef = collection(db, 'player');
    // const q = query(dbRef, where('_id', '==', uid));
    // const querySnap = await getDocs(q);
    // if (querySnap.empty) {
    //     return {
    //         code: 'failed',
    //         message: 'User does not exist.'
    //     }
    // }
    // return {
    //     code: 'succeed',
    //     message: 'Succeed!'
    // }
    const docRef = doc(db, "player", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        code: "succeed",
        data: docSnap.data(),
        message: "Succeed!"
      };
    }
    return {
      code: "failed",
      message: "User does not exist."
    };
  } catch (err) {
    return {
      code: "failed",
      message: err.message
    };
  }
};

const save = async (id, data) => {
  try {
    if (id) {
      const docRef = doc(db, "player", id);
      await setDoc(docRef, { ...data }, { merge: true });
      const dat = await getDoc(docRef);
      return {
        code: "succeed",
        data: dat.data(),
        message: "User data saved successfully!"
      };
    } else {
      const dbRef = collection(db, "player");
      const docRef = await addDoc(dbRef, { ...data });
      const dat = await getDoc(docRef);
      return {
        code: "succeed",
        data: {
          id: docRef.id,
          dat
        },
        message: "User data saved successfully!"
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
  getPlayerSnapshot,
  readAll,
  exists,
  save,
  uploadFile
};
