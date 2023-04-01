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
const read = async (uid, setData) => {
    console.log('reading from firebase', uid)
    try {
        const dbRef = collection(db, 'organization')
        const q = query(dbRef, where('uid', '==', uid), where('deleted', '==', false));
        const unsubscribe = onSnapshot(q, async (querySnap) => {
            console.log('snapshotting...')
            let temp = {}, activeCount = 0
            querySnap.forEach(doc => {
                const dat = doc.data();
                temp[doc.id] = {
                    ...dat,
                    id: doc.id
                }
                activeCount++
            })
            console.log('before setting data...')
            setData(temp, activeCount);
        })
    } catch (error) {
        console.log(error)
    }
}

const save = async (data, id) => {
    try {
        if (id) {
            const docRef = doc(db, 'organization', id);
            await updateDoc(docRef, { ...data });
            return {
                code: 'success',
                message: 'Organization data saved successfully!'
            }
        } else {
            const dbRef = collection(db, 'organization');
            const docRef = await addDoc(dbRef, { ...data });
            return {
                code: 'success',
                message: 'Organization data saved successfully!'
            }
        }
    } catch (error) {
        console.log(error)
    }
}

// Upload files to Firestore
function uploadFile(file, id, setUrl) {
    // create a storage ref
    const storageRef = ref(storage, "organization/" + id + "." + file.type.split("/")[1])

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
