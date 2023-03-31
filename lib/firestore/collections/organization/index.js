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
const read = async (uid, setData) => {
    try {
        const dbRef = collection(db, 'organization')
        const q = query(dbRef, where('uid', '==', uid), where('deleted', '==', false));
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
            const docRef = doc(db, 'organization', id);
            await setDoc(docRef, { ...data });
            const docSnap = await getDoc(docRef);
            return {
                ...docSnap.data()
            }
        } else {
            const dbRef = collection(db, 'organization');
            const docRef = await addDoc(dbRef, { ...data });
            const docSnap = await getDoc(docRef)
            return {
                ...docSnap.data(),
                id: docRef.id
            }
        }
    } catch (error) {
        console.log(error)
    }
}

// Upload files to Firestore
function uploadFile(file) {
    // create a storage ref
    const storageRef = ref(storage, "user_uploads" + file.name)

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
