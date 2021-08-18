import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    Typography,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const people = [
    {
        name: 'Benlalla Salih',
        username: '@salihben',
        avatarSrc: '/profile-image.jpg',
    },
    {
        name: 'Benlalla Salih',
        username: '@salihben',
        avatarSrc: '/profile-image.jpg',
    },
    {
        name: 'Benlalla Salih',
        username: '@salihben',
        avatarSrc: '/profile-image.jpg',
    },
    {
        name: 'Benlalla Salih',
        username: '@salihben',
        avatarSrc: '/profile-image.jpg',
    },
    {
        name: 'Benlalla Salih',
        username: '@salihben',
        avatarSrc: '/profile-image.jpg',
    },
];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        personCard: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
        name: {
            fontSize: '0.9rem',
            fontWeight: 700,
            color: 'blackBright',
        },
        username: {
            fontSize: '0.8rem',
            color: '#999',
        },
        button: {
            alignSelf: 'flex-end',
        },
    })
);

const PeopleToFollow = () => {
    const classes = useStyles();
    return (
        <Card>
            <CardHeader
                title="People To Follow"
                titleTypographyProps={{ component: 'h2', variant: 'h6' }}
            />
            <Divider variant="middle" light />

            {people.map((person, index) => (
                <div key={index}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <Avatar src={person.avatarSrc} />
                            </Grid>
                            <Grid item xs>
                                <Typography
                                    component="h3"
                                    className={classes.name}
                                >
                                    {person.name}
                                </Typography>
                                <Typography
                                    component="h4"
                                    className={classes.username}
                                >
                                    {person.username}
                                </Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Button variant="contained" color="primary">
                                    Follow
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider variant="middle" />
                </div>
            ))}
        </Card>
    );
};

export default PeopleToFollow;
