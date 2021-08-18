import { Container, Grid } from '@material-ui/core';
import { useStyles } from '../styles/styles';
import ImageSection from './ImageSection';
import AboutCard from './AboutCard';
import Posts from './Posts';
import PeopleToFollow from './PeopleToFollow';
const Profile = ({ username }: { username: string }) => {
    const classes = useStyles();
    return (
        <>
            <Container maxWidth="lg" disableGutters>
                <Grid container justify="center" spacing={2}>
                    <Grid item xs={12}>
                        <ImageSection username={username} />
                    </Grid>

                    <Grid item lg={3} xs={12}>
                        <AboutCard />
                    </Grid>

                    <Grid item lg={5} xs={12}>
                        <Posts />
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
