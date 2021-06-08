import {
  TextField,
  Button,
  Grid,
  InputAdornment,
  IconButton,
  Typography,
  Link as MuiLink,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { ChangeEvent, useState } from 'react';
import { useStyles } from '../styles/styles';
import type { SetCurrentCardProp } from '../../types/LoginPageTypes';

const SignInCard: React.FC<SetCurrentCardProp> = ({ setCurrentCard }) => {
  const [email, setEmail] = useState<String>('');
  const [password, setPassword] = useState<String>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const classes = useStyles();

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
  };

  return (
    <div className={classes.loginCard}>
      <Typography
        variant="h3"
        align="center"
        color="textPrimary"
        display="block"
        gutterBottom>
        Sign in
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        display="block"
        gutterBottom>
        Don’t have an account?
        <MuiLink
          component="button"
          variant="body2"
          className={classes.changeCardNoteLink}
          onClick={() => setCurrentCard('sign-up')}>
          {' '}
          Sign up {'\u27F6'}
        </MuiLink>
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
            <TextField
              color="primary"
              variant="outlined"
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handleChange}
              fullWidth
              margin="none"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
              Sign in
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
              Forgot your password?
              <MuiLink
                component="button"
                variant="body2"
                className={classes.changeCardNoteLink}
                onClick={() => setCurrentCard('reset-password')}>
                {' '}
                Reset password {'\u27F6'}
              </MuiLink>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default SignInCard;
