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
const read = async (oid, setData) => {
    try {
        const dbRef = collection(db, 'event')
        const q = query(dbRef, where('oid', '==', oid), where('deleted', '==', false));
        const unsubscribe = onSnapshot(q, (querySnap) => {
            let temp = {}, activeCount = 0
            querySnap.forEach(doc => {
                const dat = doc.data();
                temp[doc.id] = {
                    ...dat,
                    id: doc.id
                }
                activeCount++
            })
            setData(temp, activeCount);
        })
    } catch (error) {
        console.log(error)
    }
}

const save = async (data, id) => {
    try {
        if (id) {
            const docRef = doc(db, 'event', id);
            await updateDoc(docRef, { ...data });
            return {
                code: 'success',
                message: 'Event data saved successfully!'
            }
        } else {
            const dbRef = collection(db, 'event');
            const docRef = await addDoc(dbRef, { ...data });
            return {
                code: 'success',
                message: 'Event data saved successfully!'
            }
        }
    } catch (error) {
        console.log(error)
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
