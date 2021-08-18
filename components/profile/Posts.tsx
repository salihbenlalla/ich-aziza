import { Divider, Typography } from '@material-ui/core';
import Post from '../post/Post';
import AddPost from '../post/AddPost';

const postsData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Posts = () => {
    return (
        <>
            <AddPost />
            <Typography component="h2" variant="h6">
                Posts
            </Typography>
            <Divider variant="middle" light />
            {postsData.map((post, index) => (
                <Post key={index} />
            ))}
        </>
    );
};

export default Posts;
