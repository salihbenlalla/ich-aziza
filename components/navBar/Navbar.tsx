import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    Grid,
    Avatar,
    makeStyles,
    Theme,
    createStyles,
    Divider,
    Link as MuiLink,
} from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import ScatterPlotIcon from '@material-ui/icons/ScatterPlot';
import { NavBarProps } from '../../types/LoginPageTypes';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, logOut } from '../../redux';
import { useRouter } from 'next/dist/client/router';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolBar: {
            backgroundColor: '#fff',
        },
        appBar: {
            boxShadow: '0',
            borderBottom: '1px solid #E0E0E0',
        },
        navbarMarginTop: {
            marginTop: '3rem',
        },
        userIdentity: {
            display: 'flex',
            flaxDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            '&:hover': {
                textDecoration: 'underline rgba(0, 0, 0, 0.87)',
            },
            marginRight: -60,
        },
        userAvatar: {
            height: theme.spacing(4),
            width: theme.spacing(4),
            marginRight: theme.spacing(1),
        },
        username: {
            fontSize: '1rem',
            [theme.breakpoints.down('xs')]: {
                display: 'none',
            },
        },
        navbarMenu: {
            display: 'flex',
            flaxDirection: 'row',
            alignItems: 'center',
        },
        logoutText: {
            marginLeft: theme.spacing(0.5),
            fontSize: '1rem',
        },
        logoText: {
            '&:hover': {
                textDecoration: 'underline #fff',
            },
        },
    })
);

const Navbar: React.FC<NavBarProps> = ({ children }) => {
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const router = useRouter();

    const classes = useStyles();
    return (
        <>
            <AppBar elevation={0} className={classes.appBar}>
                <Toolbar variant="dense" className={classes.toolBar}>
                    <IconButton
                        edge="start"
                        color="primary"
                        onClick={() => router.push('/')}
                    >
                        <ScatterPlotIcon />
                    </IconButton>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Grid item xs>
                            <MuiLink href="/">
                                <Typography
                                    variant="h6"
                                    color="textPrimary"
                                    className={classes.logoText}
                                >
                                    IchAziza
                                </Typography>
                            </MuiLink>
                        </Grid>
                        <Grid item>
                            {currentUser && (
                                <div className={classes.navbarMenu}>
                                    <MuiLink
                                        className={classes.userIdentity}
                                        href={'/profile/' + currentUser?.uid}
                                    >
                                        <Avatar
                                            className={classes.userAvatar}
                                            src={
                                                currentUser?.photoURL as string
                                            }
                                        />
                                        <Typography
                                            className={classes.username}
                                            variant="h6"
                                            color="textPrimary"
                                        >
                                            {currentUser?.displayName}
                                        </Typography>
                                    </MuiLink>
                                    <Divider
                                        variant="inset"
                                        orientation="vertical"
                                        flexItem
                                    />
                                    <IconButton
                                        onClick={() => {
                                            router.push('/');
                                            dispatch(logOut());
                                        }}
                                    >
                                        <ExitToApp />
                                        <Typography
                                            className={classes.logoutText}
                                            variant="h6"
                                            color="textPrimary"
                                        >
                                            Sign out
                                        </Typography>
                                    </IconButton>
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <div className={classes.navbarMarginTop}></div>
            {children}
        </>
    );
};

export default Navbar;
