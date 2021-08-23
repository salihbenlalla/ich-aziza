import { useState, useRef, useEffect } from 'react';
import { Avatar, Badge, Box, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import changeProfilePhoto from './changeProfilePhoto';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux';
import { db } from '../../../firebase/firebaseConfig';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        profileImageSectionBox: {
            color: 'white',
            height: 300,
            backgroundImage: `url(${'/profileCover.jpg'})`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        profileImage: {
            width: 150,
            height: 150,
        },
        profileImageSectionStats: {
            display: 'flex',
            justifyContent: 'space-between',
            width: 250,
        },
        profileName: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        metrics: {
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
        },
        badge: {
            '& > span': {
                height: 35,
                width: 35,
                color: '#000',
                backgroundColor: theme.palette.background.paper,
                borderRadius: '50%',
            },
        },
        cameraAltIcon: {
            cursor: 'pointer',
        },
    })
);

const ImageSection: React.FC<{ profileId: string }> = ({
    profileId,
}: {
    profileId: string;
}) => {
    const classes = useStyles();

    const currentUser = useSelector(selectCurrentUser);

    const fileRef = useRef<HTMLInputElement>(null);
    const [username, setUserName] = useState<string | null | undefined>('');
    const [me, setMe] = useState<boolean>(false);
    const [profilePhotoURL, setProfilePhotoURL] = useState<
        string | null | undefined
    >(null);

    useEffect(() => {
        (async () => {
            if (profileId === currentUser?.uid) {
                setProfilePhotoURL(currentUser?.photoURL);
                setUserName(currentUser?.displayName);
                setMe(true);
            } else {
                const doc = await db.collection('users').doc(profileId).get();
                setUserName(
                    doc.data()?.first_name + ' ' + doc.data()?.last_name
                );
                setProfilePhotoURL(doc.data()?.profilePhotoURL);
            }
        })();
    }, [currentUser]);
    const changeProfileImage = () => {
        if (fileRef) {
            changeProfilePhoto(fileRef, setProfilePhotoURL);
        }
    };

    return (
        <Box className={classes.profileImageSectionBox}>
            {me ? (
                <Badge
                    className={classes.badge}
                    overlap="circle"
                    badgeContent={
                        <>
                            <label htmlFor="upload_profile_image">
                                <CameraAltIcon
                                    className={classes.cameraAltIcon}
                                />
                            </label>
                            <input
                                ref={fileRef}
                                id="upload_profile_image"
                                type="file"
                                onChange={changeProfileImage}
                                style={{ display: 'none' }}
                            />
                        </>
                    }
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                >
                    <Avatar
                        src={profilePhotoURL ? profilePhotoURL : ''}
                        alt={username as string}
                        className={classes.profileImage}
                    />
                </Badge>
            ) : (
                <Avatar
                    src={profilePhotoURL ? profilePhotoURL : ''}
                    alt={username as string}
                    className={classes.profileImage}
                />
            )}

            <Typography
                component="h1"
                variant="h6"
                className={classes.profileName}
            >
                {username}
            </Typography>

            <div className={classes.profileImageSectionStats}>
                <div className={classes.metrics}>
                    <Typography component="h2" variant="subtitle2">
                        37
                    </Typography>

                    <Typography component="h2" variant="subtitle2">
                        Posts
                    </Typography>
                </div>
                <div className={classes.metrics}>
                    <Typography component="h2" variant="subtitle2">
                        120k
                    </Typography>

                    <Typography component="h2" variant="subtitle2">
                        Followers
                    </Typography>
                </div>
                <div className={classes.metrics}>
                    <Typography component="h2" variant="subtitle2">
                        50
                    </Typography>

                    <Typography component="h2" variant="subtitle2">
                        Following
                    </Typography>
                </div>
            </div>
        </Box>
    );
};

export default ImageSection;
