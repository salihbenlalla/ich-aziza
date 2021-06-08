import {
  TextField,
  Button,
  Grid,
  Typography,
  Link as MuiLink,
} from '@material-ui/core';
import { ChangeEvent, useState } from 'react';
import { useStyles } from '../styles/styles';
import type { SetCurrentCardProp } from '../../types/LoginPageTypes';

const ResetPasswordCard: React.FC<SetCurrentCardProp> = ({
  setCurrentCard,
}) => {
  const [email, setEmail] = useState<String>('');

  const classes = useStyles();

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
  };

  return (
    <div className={classes.loginCard}>
      <Typography
        variant="h3"
        align="center"
        color="textPrimary"
        display="block"
        gutterBottom>
        Password reset
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        display="block"
        gutterBottom>
        Enter your email to reset your password.
      </Typography>
      <form noValidate className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              color="primary"
              variant="outlined"
              label="Email"
              name="email"
              value={email}
              onChange={handleChange}
              fullWidth
              margin="none"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="subtitle2"
              color="textPrimary"
              align="left"
              display="block"
              gutterBottom
              className={classes.requiredFieldsNote}>
              Fields that are marked with * sign are required.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.actionButton}>
              Send
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              align="center"
              color="textSecondary"
              display="inline"
              gutterBottom
              className={classes.changeCardNote}>
              Remember your password?
              <MuiLink
                component="button"
                variant="body2"
                className={classes.changeCardNoteLink}
                onClick={() => setCurrentCard('sign-in')}>
                {' '}
                Sign in here {'\u27F6'}
              </MuiLink>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default ResetPasswordCard;
