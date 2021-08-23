import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { db } from '../../firebase/firebaseConfig';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Typography,
    Divider,
    Grid,
    TextField,
    InputAdornment,
    Link as MuiLink,
} from '@material-ui/core';

//import MUI icons
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ShareIcon from '@material-ui/icons/Share';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SendIcon from '@material-ui/icons/Send';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
//import MUI colors
import { red } from '@material-ui/core/colors';

export type PostProps = {
    postText: string;
    imageDownloadURL: string;
    uid: string | undefined;
    date: firebase.firestore.Timestamp;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        media: {
            height: 0,
            paddingTop: '56.25%',
        },
        avatar: {
            backgroundColor: red[500],
        },
        commentInput: {
            borderRadius: theme.spacing(2),
            height: theme.spacing(5),
        },
        commentCards: {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        name: {
            marginBottom: theme.spacing(0.5),
            fontSize: '0.9rem',
            fontWeight: 600,
            '&:hover': {
                textDecoration: 'underline rgba(0, 0, 0, 0.87)',
            },
        },
        timePosted: {
            fontSize: '0.7rem',
            color: '#999',
        },
        cardHeader: {
            height: theme.spacing(3),
        },
        commentText: {
            fontSize: '0.8rem',
        },
    })
);

const Post: React.FC<PostProps> = ({
    postText,
    imageDownloadURL,
    uid,
    date,
}) => {
    const [user_first_name, setUser_first_name] = useState('');
    const [user_last_name, setUser_last_name] = useState('');
    const [profilePhotoURL, setProfilePhotoURL] = useState('');

    useEffect(() => {
        (async () => {
            db.collection('users')
                .doc(uid)
                .get()
                .then((doc) => {
                    setUser_first_name(doc.data()?.first_name);
                    setUser_last_name(doc.data()?.last_name);
                    setProfilePhotoURL(doc.data()?.profilePhotoURL);
                });
        })();
    }, []);

    const classes = useStyles();
    return (
        <>
            <Card className={classes.root}>
                <CardHeader
                    className={classes.cardHeader}
                    avatar={
                        <MuiLink href={'profile/' + uid}>
                            <Avatar
                                src={profilePhotoURL}
                                aria-label="recipe"
                                className={classes.avatar}
                            >
                                {user_first_name.slice(0, 1)}
                            </Avatar>
                        </MuiLink>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={
                        <MuiLink href={'profile/' + uid}>
                            <Typography
                                variant="h3"
                                color="textPrimary"
                                className={classes.name}
                            >
                                {user_first_name + ' ' + user_last_name}
                            </Typography>
                        </MuiLink>
                    }
                    subheader={
                        <Typography variant="h3" className={classes.timePosted}>
                            {date}
                        </Typography>
                    }
                />
                <CardContent>
                    <Typography
                        variant="body2"
                        color="textPrimary"
                        component="p"
                    >
                        {postText}
                    </Typography>
                </CardContent>
                <Divider variant="fullWidth" />
                <CardMedia
                    className={classes.media}
                    image={imageDownloadURL}
                    title="Paella dish"
                />

                <Divider variant="fullWidth" />
                <CardActions
                    disableSpacing
                    style={{ paddingTop: '0px', paddingBottom: '0px' }}
                >
                    <Grid container justify="space-around">
                        <Grid item>
                            <IconButton aria-label="add to favorites">
                                <FavoriteBorderOutlinedIcon />
                            </IconButton>
                            <Typography
                                component="span"
                                variant="body2"
                                color="textSecondary"
                            >
                                200
                            </Typography>
                        </Grid>
                        <Grid item>
                            <IconButton aria-label="comments">
                                <ChatBubbleOutlineOutlinedIcon />
                            </IconButton>
                            <Typography
                                component="span"
                                variant="body2"
                                color="textSecondary"
                            >
                                400
                            </Typography>
                        </Grid>
                        <Grid item>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            <Typography
                                component="span"
                                variant="body2"
                                color="textSecondary"
                            >
                                300
                            </Typography>
                        </Grid>
                    </Grid>
                </CardActions>
                <Divider variant="fullWidth" />
                <div>
                    <CardContent className={classes.commentCards}>
                        <Grid
                            container
                            wrap="nowrap"
                            spacing={1}
                            alignItems="center"
                        >
                            <Grid item>
                                <Avatar src="/profile-image.jpg" />
                            </Grid>
                            <Grid item>
                                <Typography
                                    className={classes.commentText}
                                    variant="body1"
                                    color="textSecondary"
                                    component="p"
                                >
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Voluptates debitis at quae
                                    minima corporis ...
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider variant="middle" light />

                    <CardContent className={classes.commentCards}>
                        <MuiLink href="#">
                            <Grid container>
                                <Grid item>
                                    <Typography variant="caption">
                                        See more comments
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <ArrowDropDownIcon />
                                </Grid>
                            </Grid>
                        </MuiLink>
                    </CardContent>

                    <CardContent
                        style={{ paddingBottom: '8px', paddingTop: '2px' }}
                        className={classes.commentCards}
                    >
                        <Grid
                            container
                            wrap="nowrap"
                            spacing={1}
                            alignItems="center"
                        >
                            <Grid item>
                                <Avatar src="/profile-image.jpg" />
                            </Grid>
                            <Grid item xs>
                                <TextField
                                    margin="dense"
                                    fullWidth
                                    // className={classes.commentInput}
                                    variant="outlined"
                                    size="medium"
                                    color="primary"
                                    InputProps={{
                                        className: classes.commentInput,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <SendIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </div>
            </Card>
        </>
    );
};

export default Post;
