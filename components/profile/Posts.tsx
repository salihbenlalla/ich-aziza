import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { Divider, Typography } from '@material-ui/core';
import Post from '../post/Post';
import type { PostProps } from '../post/Post';
import AddPost from '../post/AddPost';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux';
import { selectAddPostEvent } from '../../redux';

const formatDate = (date: Date) => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const month = months[+date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${month} ${day}, ${year} . ${hours}:${minutes}`;
};

const getPosts = async (uid: string | null) => {
    if (uid) {
        const posts = await db
            .collection('posts')
            .where('uid', '==', uid)
            .orderBy('date', 'desc')
            .get();
        const postsData = posts.docs.map((doc) => {
            return {
                ...doc.data(),
                date: formatDate(doc.data().date.toDate()),
            };
        });
        return postsData;
    }
    const posts = await db.collection('posts').orderBy('date', 'desc').get();
    const postsData = posts.docs.map((doc) => {
        return {
            ...doc.data(),
            date: formatDate(doc.data().date.toDate()),
        };
    });
    return postsData;
};

interface PostsProps {
    profileId: string | null;
}

const Posts: React.FC<PostsProps> = ({ profileId }) => {
    const currentUser = useSelector(selectCurrentUser);
    const [posts, setPosts] = useState<any>([]);
    const addPostEvent = useSelector(selectAddPostEvent);
    useEffect(() => {
        (async () => {
            const postsData = await getPosts(profileId);
            setPosts(postsData);
        })();
    }, [addPostEvent]);
    return (
        <>
            {currentUser?.uid === profileId && <AddPost />}

            <Typography component="h2" variant="h6">
                Posts
            </Typography>
            <Divider variant="middle" light />
            {posts.map((doc: any, index: number) => (
                <Post
                    key={index}
                    postText={doc.postText}
                    imageDownloadURL={doc.imageDownloadURL}
                    uid={doc.uid}
                    date={doc.date}
                />
            ))}
        </>
    );
};

export default Posts;
