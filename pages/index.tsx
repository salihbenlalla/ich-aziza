import LoginPage from '../components/login/LoginPage';
import NavBar from '../components/navBar/Navbar';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux';

//other imports
import { ThemeProvider } from '@material-ui/core';
import FirebaseAuthProvider from '../firebase/FirebaseAuthProvider';

import theme from '../styles/MuiTheme';

const Home = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <>
      <FirebaseAuthProvider>
        <ThemeProvider theme={theme}>
          <NavBar>
            {currentUser ? <h1>Welcome {currentUser.email}</h1> : <LoginPage />}
          </NavBar>
        </ThemeProvider>
      </FirebaseAuthProvider>
    </>
  );
};

export default Home;
