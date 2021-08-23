import LoginPage from '../components/login/LoginPage';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux';
import Posts from '../components/profile/Posts';
import { Grid, Container } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { auth } from '../firebase/firebaseAdmin';
import { NextPageContext } from 'next';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        upperSpace: {
            marginTop: theme.spacing(8),
        },
    })
);

interface PageProps {
    uid: string | null | undefined;
    children?: React.ReactNode;
}

const Home: React.FC<PageProps> = ({ uid }) => {
    const currentUser = useSelector(selectCurrentUser);
    const classes = useStyles();

    return (
        <>
            {currentUser || uid ? (
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

//get cookie from context.req?.headers.cookie
function getCookie(name: string, cookieObj: string) {
    var nameEQ = name + '=';
    var ca = cookieObj.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export async function getServerSideProps(context: NextPageContext) {
    const cookie = context.req?.headers.cookie;
    const firebaseToken = cookie ? getCookie('firebaseToken', cookie) : '';
    let decodedToken = { uid: null };
    try {
        decodedToken = await auth.verifyIdToken(firebaseToken);
    } catch (error) {}
    const uid = decodedToken.uid;

    return {
        props: {
            uid: uid,
        },
    };
}
