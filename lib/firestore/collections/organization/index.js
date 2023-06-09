import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore";
import { db, storage } from "@/lib/firebase/initFirebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { DEFAULT_CONTENTBLOCK_IMAGE, DEFAULT_LOGO } from "@/src/config/global";

export const model = {
  name: "",
  tagline: "",
  darkLogo: DEFAULT_LOGO,
  lightLogo: DEFAULT_LOGO,
  contentBlock: {
    image: DEFAULT_CONTENTBLOCK_IMAGE,
    url: "https://gamerogue.com",
    title: "Game Rogue",
    text: "This is the organization of the game rogue."
  },
  primary: "#f5851f",
  secondary: "#ab5a15",
  tertiary: "#f5851f",
  twitterLink: "",
  instagramLink: "",
  youtubeLink: "",
  discordLink: "",
  twitchLink: "",
  signup: true,
  discord: true,
  twitter: true,
  instagram: true,
  youtube: true,
  twitch: true,
  actualFund: 0,
  crowdFund: 0,
  credit: true,
  paypal: true,
  createdAt: new Date(),
  deleted: false
};

export const rules = {
  name: "required",
  tagline: "required"
};

export const customMessages = {
  "required.name": "Organization Name is required.",
  "required.tagline": "Tagline is required."
};

// Read and Write data to Organization Collection
const read = async (uid, setData, endLoading) => {
  try {
    const dbRef = collection(db, "organization");
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
      const docRef = doc(db, "organization", id);
      await setDoc(docRef, { ...data }, { merge: true });
      return {
        code: "succeed",
        message: "Organization data saved successfully!"
      };
    } else {
      const dbRef = collection(db, "organization");
      const docRef = await addDoc(dbRef, { ...data });
      return {
        code: "succeed",
        id: docRef.id,
        message: "Organization data saved successfully!"
      };
    }
  } catch (error) {
    return {
      code: "failed",
      message: error.message
    };
  }
};

// Upload files to Firestore
function uploadFile(file, id) {
  return new Promise((resolve, reject) => {
    // create a storage ref
    const storageRef = ref(storage, "organization/" + id + "." + file.type.split("/")[1]);

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
