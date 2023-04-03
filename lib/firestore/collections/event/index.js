import { db, storage } from '@/lib/firebase/initFirebase';
import {
    addDoc,
    getDoc,
    setDoc,
    collection,
    query,
    where,
    onSnapshot
} from "firebase/firestore"
import {
    // getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";

// Read and Write data to Organization Collection
const read = async (uid, setData, endLoading) => {
    try {
        const dbRef = collection(db, 'event')
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
            endLoading()
        })
    } catch (err) {
        console.log(err)
        endLoading()
    }
}

const save = async (data, id) => {
    console.log('event: ', id, data)
    try {
        if (id) {
            const docRef = doc(db, 'event', id);
            await updateDoc(docRef, { ...data });
            return {
                code: 'succeed',
                message: 'Event data saved successfully!'
            }
        } else {
            const dbRef = collection(db, 'event');
            console.log('adding event data...')
            const docRef = await addDoc(dbRef, { ...data });
            console.log('finished event data save.')
            return {
                code: 'succeed',
                id: docRef.id,
                message: 'Event data saved successfully!'
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
function uploadFile(file, id, name, setUrl) {
    // create a storage ref
    const storageRef = ref(storage, "event/" + id + "/" + name + "." + file.type.split("/")[1])

    getDownloadURL(storageRef)
        .then(url => setUrl(url))
        .catch(err => console.log(err))

    // upload file
    const task = uploadBytesResumable(storageRef, file)

    // update progress bar
    task.on('state_change',
        function progress(snapshot) {
            // setValue((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        },
        function error(err) {
            alert(error)
        },
        function complete() {
            alert('Uploaded to firebase storage successfully!')
        }
    )
}

export default {
    read,
    save,
    uploadFile
}
