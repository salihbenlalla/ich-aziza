import LoginPage from '../components/login/LoginPage';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux';
import Posts from '../components/profile/Posts';
import { Grid, Container } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        upperSpace: {
            marginTop: theme.spacing(8),
        },
    })
);

const Home = () => {
    const currentUser = useSelector(selectCurrentUser);
    const classes = useStyles();

    return (
        <>
            {currentUser ? (
                <Container
                    maxWidth="lg"
                    disableGutters
                    className={classes.upperSpace}
                >
                    <Grid container justify="center" spacing={2}>
                        <Grid item lg={3} xs={12}></Grid>

                        <Grid item lg={5} xs={12}>
                            <Posts profileId={null} />
                        </Grid>

                        <Grid item lg={3} xs={12}></Grid>
                    </Grid>
                </Container>
            ) : (
                <LoginPage />
            )}
        </>
    );
};

export default Home;
