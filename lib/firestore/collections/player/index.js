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
        const dbRef = collection(db, 'player')
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
        console.log(err)
        endLoading()
    }
}

const save = async (data, id) => {
    console.log('user: ', id, data)
    try {
        if (id) {
            const docRef = doc(db, 'player', id);
            await updateDoc(docRef, { ...data });
            return {
                code: 'succeed',
                message: 'User data saved successfully!'
            }
        } else {
            const dbRef = collection(db, 'player');
            console.log('adding player data...')
            const docRef = await addDoc(dbRef, { ...data });
            console.log('finished player data save.')
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
function uploadFile(file, id, name, setUrl) {
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
            console.log(err)
        },
        function complete() {
            console.log('Uploaded to firebase storage successfully!')
            getDownloadURL(storageRef)
                .then(url => setUrl(url))
                .catch(err => console.log(err))

        }
    )
}

export default {
    read,
    save,
    uploadFile
}
