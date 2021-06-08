import { Grid } from '@material-ui/core';
import { useState } from 'react';
import ResetPasswordCard from './ResetPasswordCard';
import SignInCard from './SignInCard';
import SignUpCard from './SignUpCard';
import { useStyles } from '../styles/styles';
import { CardTypeProps } from '../../types/LoginPageTypes';

const LoginPage: React.FC = () => {
  const [currentCard, setCurrentCard] = useState<CardTypeProps>('sign-in');
  const classes = useStyles();

  let cardToRender: JSX.Element;

  if (currentCard === 'sign-up') {
    cardToRender = <SignUpCard setCurrentCard={setCurrentCard} />;
  } else if (currentCard === 'sign-in') {
    cardToRender = <SignInCard setCurrentCard={setCurrentCard} />;
  } else {
    cardToRender = <ResetPasswordCard setCurrentCard={setCurrentCard} />;
  }

  return (
    <Grid container>
      <Grid item xs={12} md={5}>
        Hello
        {cardToRender}
      </Grid>
      <Grid item xs={12} md={7}>
        <div className={classes.loginCoverDiv}>
          <img
            src="/login-cover.png"
            alt="cover"
            className={classes.loginCoverImage}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
