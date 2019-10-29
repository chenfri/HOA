import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import LogOut from './LogOut'
import Tenant from '../Tenant';
import { withRouter } from 'react-router-dom';
import '../Style/Style.css';
import './SignIn.css'

let username = "";
let password = "";
let forgotPassword = "";



// let show = false;


const useStyles = makeStyles(theme => ({
  '@global': {
 
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



function SignIn(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
        <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
         מערכת לניהול ועד בית : 
         התחברות
        </Typography>
        <form className={classes.form} noValidate onChange={handleChange}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userName"
            label="אימייל"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="סיסמא"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />

          <Button
           onClick={onClickSignIn}
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}

          >
            התחבר
          </Button>
          <Grid container>
            <Grid item xs>
              
  
            </Grid>
            <Grid item>
              <div /*style={forgotPasswordStyle()}*/>
              <input className="inputStyleForm" type="email" onChange={handleChange} placeholder='הכנס דוא"ל לשחזור סיסמא' name="forgotPassword" />
              <button className="buttonStyleForm" type='button' onClick={renewPassword}>שלח</button>
              </div>
            </Grid>
          </Grid>
          <Grid container>
    
            <Grid item>

            </Grid>
          </Grid>

        </form>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
  );

function handleForgetPassword(){}

function handleChange(e)
{
  if(e.target.type === 'password'){
    password = e.target.value;
  }
  if(e.target.name === 'email'){
    username = e.target.value;
  }
  if(e.target.type === 'email'){
    forgotPassword = e.target.value;
    renewPassword()
  } 
}


function onClickSignIn()
{
  firebase.auth().signInWithEmailAndPassword(username, password)
  .then(result => {
    if(firebase.auth().currentUser.uid === 'vusYD78f1XTaPQMNdeTS3sF1uDE3'){
      props.history.replace('/create-building')
    }
    else{
      props.history.replace('HomePage')
    }
    
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert('אחד הפרטים אינם נכונים,אנא נסה שנית')
  })
}


function logingOut (){
  firebase.auth().signOut();
}


// function inputForgotPassword()
// {
//   if(show){
//     show = false }
//   else{
//     show = true;
//   }
// }


       // <button className = 'forgetButton' onClick={handleForgetPassword} /*variant="body2"*/>
       //   שכחת סיסמא?
       //   </button>

function renewPassword()
{
  let auth = firebase.auth();
  let emailAddress = forgotPassword;

  auth.sendPasswordResetEmail(emailAddress).then(function(){
    // Email sent.
    alert("ברגעים אלו נשלח אליך דואר אלקטרוני לחידוש הסיסמא")
    // show = false;
  }).catch(function(error) {
    alert("כתובת המייל שהזנת אינה נכונה")
    // An error happened.
  });
}

  
}

export default withRouter(SignIn)