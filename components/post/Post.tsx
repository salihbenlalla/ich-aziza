import React from 'react';
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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
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
    })
);

export default function Post() {
    const classes = useStyles();

    return (
        <>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar
                            src="/profile-image.jpg"
                            aria-label="recipe"
                            className={classes.avatar}
                        >
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title="Benlalla Salih"
                    subheader="August 12, 2021"
                />
                <CardMedia
                    className={classes.media}
                    image="/paella.jpg"
                    title="Paella dish"
                />
                <CardContent>
                    <Typography
                        variant="body2"
                        color="textPrimary"
                        component="p"
                    >
                        This impressive paella is a perfect party dish and a fun
                        meal to cook together with your guests. Add 1 cup of
                        frozen peas along with the mussels, if you like.
                    </Typography>
                </CardContent>
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
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                >
                                    Heat 1/2 cup of the broth in a pot until
                                    simmering, add saffron and set aside for 10
                                    minutes.
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
}
