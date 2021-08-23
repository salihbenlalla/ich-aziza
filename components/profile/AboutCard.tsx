import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    Typography,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const cardData = [
    {
        subTitle: 'studied at:',
        description: 'école des hautes études commerciales',
    },
    {
        subTitle: 'working at:',
        description: 'ministère des finances',
    },
    {
        subTitle: 'Hobbies:',
        description: 'programming & web development',
    },
];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        aboutCardItems: {
            marginBottom: '1rem',
        },
        aboutCardSubtitles: {
            color: '#999',
            fontSize: '0.9rem',
        },
        aboutCardSubtitlesDescription: {
            color: 'blackBright',
            fontWeight: 600,
            fontSize: '0.9rem',
        },
    })
);

const AboutCard = () => {
    const classes = useStyles();
    return (
        <Card>
            <CardHeader
                title="About"
                titleTypographyProps={{ component: 'h2', variant: 'h6' }}
            />
            <Divider variant="middle" light />
            <CardContent>
                {cardData.map((obj, index) => (
                    <div className={classes.aboutCardItems} key={index}>
                        <Typography
                            component="h3"
                            className={classes.aboutCardSubtitles}
                        >
                            {obj.subTitle}
                        </Typography>
                        <Typography
                            component="h4"
                            className={classes.aboutCardSubtitlesDescription}
                        >
                            {obj.description}
                        </Typography>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default AboutCard;
