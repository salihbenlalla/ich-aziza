import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';
import firebase from 'firebase';
import { storage, db, auth } from '../../firebase/firebaseConfig';
import { selectCurrentUser } from '../../redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    Avatar,
    Grid,
    TextField,
    Button,
    Divider,
    LinearProgress,
} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { setAddPost, selectAddPostEvent } from '../../redux';

//import MUI icons
import InsertPhotoOutlinedIcon from '@material-ui/icons/InsertPhotoOutlined';
import GifIcon from '@material-ui/icons/Gif';
import InsertEmoticonOutlinedIcon from '@material-ui/icons/InsertEmoticonOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
        addPostInput: {
            minHeight: theme.spacing(8),
            marginBottom: theme.spacing(2),
            '&:before': {
                content: 'none',
            },
            '&:after': {
                content: 'none',
            },
        },
        avatar: {
            marginTop: theme.spacing(1),
        },
        imageContainer: {
            position: 'relative',
        },
        image: {
            width: '100%',
        },
        removeImageIcon: {
            position: 'absolute',
            top: 5,
            left: 5,
            color: 'white',
            cursor: 'pointer',
        },
        AddPosticons: {
            marginRight: 8,
            marginLeft: 8,
            cursor: 'pointer',
        },
        addPostBottomSection: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        divider: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
    })
);

const AddPost = () => {
    const classes = useStyles();

    const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
    const [postText, setPostText] = useState('');
    const [progressValue, setProgressValue] = useState(0);
    const [progressBarShow, setProgressBarShow] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const AddPostEvent = useSelector(selectAddPostEvent);
    const [avatarSrc, setAvatarSrc] = useState<string | null | undefined>(null);

    const submitPostHandler = async (
        fileRef: React.RefObject<HTMLInputElement>
    ) => {
        if (fileRef.current && fileRef.current.files) {
            setProgressBarShow(true);
            const image = fileRef.current.files[0];
            const metaData = {
                contentType: image.type,
            };
            const storageRef = storage.ref();
            const uploadTask = storageRef
                .child('images/' + uuidV4())
                .put(image, metaData);

            uploadTask.on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot) => {
                    let progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgressValue(progress);
                },
                (error) => {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            console.log(
                                'you are not authorized to upload images!'
                            );
                            break;
                        case 'storage/canceled':
                            console.log('upload task is canceled!');
                            break;

                        case 'storage/unknown':
                            console.log('unknown error has occured!');
                            break;
                    }
                },
                () => {
                    uploadTask.snapshot.ref
                        .getDownloadURL()
                        .then((downloadURL) => {
                            submitTextHandler(postText, downloadURL);

                            if (firebase.storage.TaskState.SUCCESS) {
                                RemovePreviewImage();
                                setPostText('');
                                setProgressBarShow(false);
                                setProgressValue(0);
                                dispatch(setAddPost(!AddPostEvent));
                            } // or 'running'
                        });
                }
            );
        }
    };

    const submitTextHandler = async (
        postText: string,
        imageDownloadURL: string
    ) => {
        const post = {
            postText,
            imageDownloadURL,
            uid: auth.currentUser?.uid,
            date: firebase.firestore.Timestamp.now(),
        };
        await db.collection('posts').doc().set(post);
    };

    const RemovePreviewImage = () => {
        setImageSrc(null);
    };

    const uploadImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target && e.target.files) {
            const reader = new FileReader();
            reader.onloadend = () => setImageSrc(reader.result);
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    useEffect(() => setAvatarSrc(currentUser?.photoURL), [currentUser]);

    return (
        <>
            <Card className={classes.root}>
                {progressBarShow && (
                    <LinearProgress
                        variant="determinate"
                        value={progressValue}
                    />
                )}
                <CardContent>
                    <Grid
                        container
                        wrap="nowrap"
                        spacing={3}
                        alignItems="flex-start"
                    >
                        <Grid item>
                            <Avatar
                                src={avatarSrc ? avatarSrc : ''}
                                className={classes.avatar}
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                variant="standard"
                                color="primary"
                                placeholder="What's on your mind ?"
                                multiline
                                value={postText}
                                onChange={(e) => setPostText(e.target.value)}
                                InputProps={{
                                    className: classes.addPostInput,
                                }}
                            />
                            {typeof imageSrc === 'string' && (
                                <div className={classes.imageContainer}>
                                    <img
                                        className={classes.image}
                                        src={imageSrc}
                                    />

                                    <HighlightOffIcon
                                        onClick={RemovePreviewImage}
                                        className={classes.removeImageIcon}
                                    />
                                </div>
                            )}

                            <Divider
                                variant="fullWidth"
                                className={classes.divider}
                            />
                            <div className={classes.addPostBottomSection}>
                                <div>
                                    <label htmlFor="upload_image">
                                        <InsertPhotoOutlinedIcon
                                            color="primary"
                                            className={classes.AddPosticons}
                                        />
                                    </label>
                                    <input
                                        ref={fileRef}
                                        id="upload_image"
                                        type="file"
                                        onChange={uploadImageHandler}
                                        style={{ display: 'none' }}
                                    />
                                    <GifIcon
                                        color="primary"
                                        className={classes.AddPosticons}
                                    />
                                    <InsertEmoticonOutlinedIcon
                                        color="primary"
                                        className={classes.AddPosticons}
                                    />
                                </div>
                                <div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="medium"
                                        onClick={() =>
                                            submitPostHandler(fileRef)
                                        }
                                    >
                                        Post
                                    </Button>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
};

export default AddPost;
