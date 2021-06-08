import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Apple } from '@material-ui/icons';
import { useStyles } from '../styles/styles';
import { NavBarProps } from '../../types/LoginPageTypes';

const Navbar: React.FC<NavBarProps> = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <AppBar elevation={0} className={classes.appBar}>
        <Toolbar variant="dense" className={classes.toolBar}>
          <IconButton edge="start" color="primary">
            <Apple />
          </IconButton>
          <Typography variant="h6" color="textPrimary">
            IchAziza
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.navbarMarginTop}></div>
      {children}
    </>
  );
};

export default Navbar;
