import { Avatar, Box, Typography } from '@material-ui/core';
import { useStyles } from '../styles/styles';

const ImageSection = ({ username }: { username: string }) => {
    const classes = useStyles();
    return (
        <Box className={classes.profileImageSectionBox}>
            <Avatar
                src="/profile-image.jpg"
                alt="Salih Benlalla"
                className={classes.profileImage}
            />

            <Typography
                component="h1"
                variant="h6"
                className={classes.profileName}
            >
                {username}
            </Typography>

            <div className={classes.profileImageSectionStats}>
                <span>
                    37 <br /> Posts
                </span>
                <span>
                    120k <br /> Followers
                </span>
                <span>
                    50 <br /> Following
                </span>
            </div>
        </Box>
    );
};

export default ImageSection;
