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

export const model = {
  type: "",
  sender: null,
  receiver: null,
  description: "",
  data: {},
  createdAt: new Date(),
  deleted: false,
};

export const rules = {
  type: "required",
  sender: "required",
  receiver: "required",
};

export const customMessages = {
  "required.type": "Ticket type is required.",
  "required.sender": "Sender ID is required.",
  "required.receiver": "Receiver ID is required.",
};

// Read and Write data to Team Collection
const read = async (uid, setData, endLoading) => {
  try {
    const dbRef = collection(db, "tickets");
    const q = query(
      dbRef,
      where("receiver", "==", uid),
      where("deleted", "==", false)
    );
    const unsubscribe = onSnapshot(q, async (querySnap) => {
      let temp = {};
      querySnap.forEach((doc) => {
        const dat = doc.data();
        temp[doc.id] = {
          ...dat,
          id: doc.id,
        };
      });
      await setData(temp);
      endLoading();
    });
  } catch (err) {
    console.error(err);
    endLoading();
  }
};

const save = async (id, data) => {
  try {
    if (id) {
      const docRef = doc(db, "tickets", id);
      await setDoc(docRef, { ...data }, { merge: true });
      return {
        code: "succeed",
        id: id,
        message: "Ticket created successfully!",
      };
    } else {
      const dbRef = collection(db, "tickets");
      const docRef = await addDoc(dbRef, { ...data });
      return {
        code: "succeed",
        id: docRef.id,
        message: "Ticket saved successfully!",
      };
    }
  } catch (err) {
    return {
      code: "failed",
      message: err.message,
    };
  }
};

export default {
  read,
  save,
};
