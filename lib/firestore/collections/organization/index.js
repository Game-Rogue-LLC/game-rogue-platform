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
    onSnapshot
} from "firebase/firestore"
import {
    getDownloadURL,
    // getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";

// Read and Write data to Organization Collection
const read = async (uid, setData, endLoading) => {
    try {
        const dbRef = collection(db, 'organization')
        const q = query(dbRef, where('uid', '==', uid), where('deleted', '==', false));
        const unsubscribe = onSnapshot(q, async (querySnap) => {
            let temp = {}, activeCount = 0
            querySnap.forEach(doc => {
                const dat = doc.data();
                temp[doc.id] = {
                    ...dat,
                    id: doc.id
                }
                activeCount++
            })
            await setData(temp, activeCount);
            endLoading();
        })
    } catch (error) {
        console.error(error)
        endLoading()
    }
}

const save = async (id, data) => {
    try {
        if (id) {
            const docRef = doc(db, 'organization', id);
            await setDoc(docRef, { ...data }, { merge: true });
            return {
                code: 'succeed',
                message: 'Organization data saved successfully!'
            }
        } else {
            const dbRef = collection(db, 'organization');
            const docRef = await addDoc(dbRef, { ...data });
            return {
                code: 'succeed',
                id: docRef.id,
                message: 'Organization data saved successfully!'
            }
        }
    } catch (error) {
        return {
            code: 'failed',
            message: error.message
        }
    }
}

// Upload files to Firestore
function uploadFile(file, id) {
    return new Promise((resolve, reject) => {
        // create a storage ref
        const storageRef = ref(storage, "organization\/" + id + "." + file.type.split("/")[1])

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
    read,
    save,
    uploadFile
}