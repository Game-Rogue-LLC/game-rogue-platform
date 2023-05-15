import { db, storage } from "@/lib/firebase/initFirebase";
import {
  doc,
  addDoc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import {
  getDownloadURL,
  // getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  DEFAULT_CONTENTBLOCK_IMAGE,
  DEFAULT_LOGO,
  EVENT_STATES,
} from "@/src/config/global";

export const model = {
  banner: DEFAULT_CONTENTBLOCK_IMAGE,
  darkLogo: DEFAULT_LOGO,
  logo: DEFAULT_CONTENTBLOCK_IMAGE,
  name: "",
  oid: "",
  category: 0, // league or tournament
  format: 0, // single, double, round robin ...
  seed: 0, // Manual
  startAt: new Date(),
  endAt: new Date(),
  registerTo: new Date(),
  primary: "#f5851f",
  secondary: "#ab5a15",
  tertiary: "#f5851f",
  game: 0,
  platform: 0,
  region: 0,
  timezone: 0,
  rulebook: "",
  terms: "",
  privacy: "",
  checkin: 15,
  prize: 0,
  entryFee: 0,
  description: "",
  participants: [],
  participantsCount: 2,
  rounds: [],
  currentRound: 1,
  status: EVENT_STATES.CREATING.value,
  primary: "#f5851f",
  secondary: "#ab5a15",
  tertiary: "#f5851f",
  createdAt: new Date(),
  deleted: false,
};

export const rules = {
  name: "required",
  checkin: "required",
};

export const customMessages = {
  "required.name": "Event Name is required.",
  "required.checkin": "CheckIn is required.",
};

// Read and Write data to Organization Collection
const read = async (uid, setData, endLoading) => {
  try {
    const dbRef = collection(db, "event");
    const q = query(dbRef, where("deleted", "==", false));
    const unsubscribe = onSnapshot(q, async (querySnap) => {
      let temp = {},
        activeCount = {};
      querySnap.forEach((doc) => {
        const dat = doc.data();
        temp[doc.id] = {
          ...model,
          ...dat,
          id: doc.id,
          startAt: dat.startAt ? dat.startAt.toDate() : new Date(),
          endAt: dat.endAt ? dat.endAt.toDate() : new Date(),
          registerTo: dat.registerTo ? dat.registerTo.toDate() : new Date(),
        };
        if (!activeCount[dat.oid]) activeCount[dat.oid] = 0;
        activeCount[dat.oid]++;
      });
      await setData(temp, activeCount);
      endLoading();
    });
  } catch (err) {
    console.error(err);
    endLoading();
  }
};

const save = async (id, data) => {
  console.warn(data);
  try {
    if (id) {
      const docRef = doc(db, "event", id);
      await setDoc(docRef, { ...data }, { merge: true });
      return {
        code: "succeed",
        message: "Event data saved successfully!",
      };
    } else {
      const dbRef = collection(db, "event");
      const docRef = await addDoc(dbRef, { ...data });
      return {
        code: "succeed",
        id: docRef.id,
        message: "Event data saved successfully!",
      };
    }
  } catch (err) {
    return {
      code: "failed",
      message: err.message,
    };
  }
};

// Upload files to Firestore
function uploadFile(file, id, name) {
  return new Promise((resolve, reject) => {
    // create a storage ref
    const storageRef = ref(
      storage,
      "event/" + id + "/" + name + "." + file.type.split("/")[1]
    );

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
          message: err.message,
        });
      },
      function complete() {
        getDownloadURL(storageRef)
          .then((url) =>
            resolve({
              code: "succeed",
              url,
            })
          )
          .catch((err) =>
            reject({
              code: "failed",
              message: err.message,
            })
          );
      }
    );
  });
}

export default {
  read,
  save,
  uploadFile,
};
