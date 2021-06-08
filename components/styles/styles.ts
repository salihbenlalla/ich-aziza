import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  actionButton: {
    textTransform: 'unset',
  },
  requiredFieldsNote: {
    fontStyle: 'italic',
    marginTop: theme.spacing(2),
    fontWeight: 400,
    fontSize: '0.8rem',
  },
  loginCard: {
    [theme.breakpoints.up('xs')]: {
      marginTop: theme.spacing(12),
      margin: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(12),
      margin: theme.spacing(1),
    },
  },
  form: {
    marginTop: theme.spacing(4),
  },
  changeCardNote: {
    fontWeight: 400,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeCardNoteLink: {
    fontWeight: 700,
    marginLeft: theme.spacing(1),
  },
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
  loginCoverDiv: {
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    clipPath: 'polygon(10% 0%, 100% 0, 100% 100%, 0% 100%)',
    shapeOutside: 'polygon(10% 0%, 100% 0, 100% 100%, 0% 100%)',
    transform: 'translateX(1.05%)',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  loginCoverImage: {
    maxHeight: '95vh',
    objectFit: 'cover',
  },
  marginZero: {
    margin: 0,
  },
}));

export { useStyles };
