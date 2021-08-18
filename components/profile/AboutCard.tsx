import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    Typography,
} from '@material-ui/core';
import { useStyles } from '../styles/styles';

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
        subTitle: 'loves:',
        description: 'programming & web development',
    },
    {
        subTitle: 'preferred food :',
        description: 'banana, tacos, & everything',
    },
    {
        subTitle: 'preferred pet:',
        description: 'cats',
    },
];

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
