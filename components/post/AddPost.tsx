import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    Avatar,
    Typography,
    Divider,
    Grid,
    TextField,
    Button,
} from '@material-ui/core';

//import MUI icons
import InsertPhotoOutlinedIcon from '@material-ui/icons/InsertPhotoOutlined';
import GifIcon from '@material-ui/icons/Gif';
import InsertEmoticonOutlinedIcon from '@material-ui/icons/InsertEmoticonOutlined';
//import MUI colors
import { red } from '@material-ui/core/colors';
import { FullscreenExitTwoTone } from '@material-ui/icons';

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
        },
        avatar: {
            marginTop: theme.spacing(1),
        },
        AddPosticons: {
            marginRight: 8,
            marginLeft: 8,
        },
        addPostBottomSection: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
    })
);

const AddPost = () => {
    const classes = useStyles();

    return (
        <>
            <Card className={classes.root}>
                <CardContent>
                    <Grid
                        container
                        wrap="nowrap"
                        spacing={3}
                        alignItems="flex-start"
                    >
                        <Grid item>
                            <Avatar
                                src="/profile-image.jpg"
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
                                InputProps={{
                                    className: classes.addPostInput,
                                }}
                            />
                            <div className={classes.addPostBottomSection}>
                                <div>
                                    <InsertPhotoOutlinedIcon
                                        color="primary"
                                        className={classes.AddPosticons}
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
