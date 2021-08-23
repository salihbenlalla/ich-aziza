import React from 'react';
import firebase from 'firebase';
import { auth, db, storage } from '../../../firebase/firebaseConfig';
import { v4 as uuidV4 } from 'uuid';

const changeProfilePhoto = async (
    fileRef: React.RefObject<HTMLInputElement>,
    setProfilePhotoURL: React.Dispatch<
        React.SetStateAction<string | null | undefined>
    >
) => {
    if (fileRef.current && fileRef.current.files) {
        const image = fileRef.current.files[0];
        const metaData = {
            contentType: image.type,
        };
        const storageRef = storage.ref();
        const uploadTask = storageRef
            .child('profile_images/' + uuidV4())
            .put(image, metaData);

        uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        console.log(
                            'you are not authorized to upload the image!'
                        );
                        break;
                    case 'storage/canceled':
                        console.log('upload task is canceled!');
                        break;
                    case 'storage/unknown':
                        console.log(
                            'unknown error has occured while uploading the image'
                        );
                        break;
                }
            },
            () => {
                uploadTask.snapshot.ref
                    .getDownloadURL()
                    .then(async (downloadURL) => {
                        if (firebase.storage.TaskState.SUCCESS) {
                            console.log('Upload succeded!');
                            try {
                                const result1 = auth.currentUser?.updateProfile(
                                    { photoURL: downloadURL }
                                );
                                const result2 = await db
                                    .collection('users')
                                    .doc(auth.currentUser?.uid)
                                    .update({ profilePhotoURL: downloadURL });
                                console.log(
                                    'image url updated successfully: ',
                                    result1,
                                    result2
                                );

                                setProfilePhotoURL(downloadURL);
                            } catch (error) {
                                console.log(
                                    'an error has occured while updating image URL'
                                );
                            }
                        }
                    });
            }
        );
    }
};

export default changeProfilePhoto;
