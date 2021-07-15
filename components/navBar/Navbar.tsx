import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Grid,
} from '@material-ui/core';
import { Apple, ExitToApp } from '@material-ui/icons';
import { useStyles } from '../styles/styles';
import { NavBarProps } from '../../types/LoginPageTypes';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, logOut } from '../../redux';

const Navbar: React.FC<NavBarProps> = ({ children }) => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const classes = useStyles();
  return (
    <>
      <AppBar elevation={0} className={classes.appBar}>
        <Toolbar variant="dense" className={classes.toolBar}>
          <IconButton edge="start" color="primary">
            <Apple />
          </IconButton>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center">
            <Grid item xs={9}>
              <Typography variant="h6" color="textPrimary">
                IchAziza
              </Typography>
            </Grid>
            <Grid item xs={3}>
              {currentUser && (
                <Typography variant="h6" color="textPrimary">
                  {currentUser?.email}
                  <IconButton>
                    <ExitToApp onClick={() => dispatch(logOut())} />
                  </IconButton>
                </Typography>
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
