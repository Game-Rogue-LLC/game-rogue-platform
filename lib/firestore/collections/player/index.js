import { db, storage } from '@/lib/firebase/initFirebase';
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
    getDocs,
    Timestamp
} from "firebase/firestore"
import {
    getDownloadURL,
    // getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";

// Read and Write data to Organization Collection
const readAll = async (setData, endLoading) => {
    try {
        const dbRef = collection(db, 'player');
        const q = query(dbRef, where('deleted', '==', false));
        const unsubscribe = onSnapshot(q, async (querySnap) => {
            let temp = {};
            querySnap.forEach(doc => {
                const dat = doc.data();
                temp[doc.id] = {
                    ...dat,
                    id: doc.id,
                    birthday: (dat.birthday ? dat.birthday.toDate() : new Date())
                }
            })
            await setData(temp);
            endLoading()
        })
    } catch (err) {
        console.log(err)
        endLoading()
    }
}

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
        const docRef = doc(db, 'player', uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return {
                code: 'succeed',
                message: 'Succeed!'
            }
        }
        return {
            code: 'failed',
            message: 'User does not exist.'
        }
    } catch (err) {
        console.log(err)
        return {
            code: 'failed',
            message: err.message
        }
    }
}

const save = async (id, data) => {
    try {
        if (id) {
            const docRef = doc(db, 'player', id);
            await setDoc(docRef, { ...data }, { merge: true });
            return {
                code: 'succeed',
                message: 'User data saved successfully!'
            }
        } else {
            const dbRef = collection(db, 'player');
            const docRef = await addDoc(dbRef, { ...data });
            return {
                code: 'succeed',
                id: docRef.id,
                message: 'User data saved successfully!'
            }
        }
    } catch (err) {
        return {
            code: 'failed',
            message: err.message
        }
    }
}

// Upload files to Firestore
function uploadFile(file, id, name) {
    return new Promise((resolve, reject) => {
        // create a storage ref
        const storageRef = ref(storage, "user\/" + id + "\/" + name + "." + file.type.split("/")[1])

        // upload file
        const task = uploadBytesResumable(storageRef, file)

        // update progress bar
        task.on('state_change',
            function progress(snapshot) {
                // setValue((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            },
            function error(err) {
                reject({
                    code: 'failed',
                    message: err.message
                });
            },
            function complete() {
                getDownloadURL(storageRef)
                    .then(url => resolve({
                        code: 'succeed',
                        url
                    }))
                    .catch(err => reject({
                        code: 'failed',
                        message: err.message
                    }))
            }
        )
    })
}

export default {
    readAll,
    exists,
    save,
    uploadFile
}
