import { Container, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ImageSection from './imageSection/ImageSection';
import AboutCard from './AboutCard';
import Posts from './Posts';
import PeopleToFollow from './PeopleToFollow';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginBottom: theme.spacing(2),
        },
    })
);

const Profile = ({ profileId }: { profileId: string }) => {
    const classes = useStyles();
    return (
        <>
            <Grid container justify="center" className={classes.root}>
                <Grid item xs={12}>
                    <ImageSection profileId={profileId} />
                </Grid>
            </Grid>
            <Container maxWidth="lg" disableGutters>
                <Grid container justify="center" spacing={2}>
                    <Grid item lg={3} xs={12}>
                        <AboutCard />
                    </Grid>

                    <Grid item lg={5} xs={12}>
                        <Posts profileId={profileId} />
                    </Grid>

                    <Grid item lg={3} xs={12}>
                        <PeopleToFollow />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Profile;
