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

// Read and Write data to Team Collection
const read = async (uid, setData, endLoading) => {
    try {
        const dbRef = collection(db, 'team')
        const q = query(dbRef, where('deleted', '==', false));
        const unsubscribe = onSnapshot(q, async (querySnap) => {
            let temp = {}
            querySnap.forEach(doc => {
                const { accessCode, ...dat } = doc.data();
                temp[doc.id] = {
                    ...dat,
                    id: doc.id
                }
                // Include accessCode to the response if the team is owned by this user(uid)
                if (dat.players.findIndex(val => val.id == uid) >= 0) {
                    temp[doc.id] = {
                        ...temp[doc.id],
                        accessCode
                    }
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

const getById = async (id) => {
    try {
        const docRef = doc(db, 'team', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return {
                code: 'succeed',
                data: docSnap.data()
            }
        } else {
            return {
                code: 'failed',
                message: 'Team does not exist.'
            }
        }
    } catch (err) {
        console.log(err)
    }
}

const save = async (id, data) => {
    console.log('team: ', id, data)
    try {
        if (id) {
            const docRef = doc(db, 'team', id);
            await setDoc(docRef, { ...data }, { merge: true });
            return {
                code: 'succeed',
                id: id,
                message: 'Team data saved successfully!'
            }
        } else {
            const dbRef = collection(db, 'team');
            console.log('adding team data...')
            const docRef = await addDoc(dbRef, { ...data });
            console.log('finished team data save.')
            return {
                code: 'succeed',
                id: docRef.id,
                message: 'Team data saved successfully!'
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
        const storageRef = ref(storage, "team\/" + id + "\/" + name + "." + file.type.split("/")[1])

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
    getById,
    read,
    save,
    uploadFile
}
