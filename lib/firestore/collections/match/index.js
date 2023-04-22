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
        const dbRef = collection(db, 'match')
        const q = query(dbRef, where('uid', '==', uid), where('deleted', '==', false));
        const unsubscribe = onSnapshot(q, async (querySnap) => {
            let temp = {}, activeCount = {}
            querySnap.forEach(doc => {
                const dat = doc.data();
                temp[doc.id] = {
                    ...dat,
                    id: doc.id
                }
                if (!activeCount[dat.oid]) activeCount[dat.oid] = 0
                activeCount[dat.oid]++
            })
            await setData(temp, activeCount);
            endLoading()
        })
    } catch (err) {
        console.error(err)
        endLoading()
    }
}

const save = async (data, id) => {
    try {
        if (id) {
            const docRef = doc(db, 'match', id);
            await updateDoc(docRef, { ...data });
            return {
                code: 'succeed',
                message: 'Match data saved successfully!'
            }
        } else {
            const dbRef = collection(db, 'match');
            const docRef = await addDoc(dbRef, { ...data });
            return {
                code: 'succeed',
                id: docRef.id,
                message: 'Match data saved successfully!'
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
        const storageRef = ref(storage, "match\/" + id + "\/" + name + "." + file.type.split("/")[1])

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
