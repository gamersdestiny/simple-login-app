import './App.css';
import {useState} from 'react';
import Axios from 'axios';
import validator from 'validator';
import { TextField, Button, Typography  } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import Login from './success/Login'


const useStyles = makeStyles({
  root: {
    display: 'flex'
  },
  formControl: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    '& > *':{
      margin: '.5em auto'
    }
  },
  '& .MuiInputBase-root':{
    'color': 'red'
  }
})
function App() {
  var history = useHistory();
  const classes = useStyles();
  const [login, setLogin] = useState(false)
  const [regUsername, setUsername] =  useState('');
  const [password, setPassword] =  useState('');
  const [regEmail, setEmail] =  useState('');
  const [regConfimPasswrod, setConfirmPassword] =  useState('');
  const [emailError, setEmailError] = useState([{
    error:false,
    message: ''
  }])
  const [passwordError, setPasswordError] = useState([{
    error: false,
    message: ''
  }])
  const [confirmPasswordError, setConfirmPasswordError] = useState([{
    error: false,
    message: ''
  }])
  const [response, setResponse] = useState('');
  
  const register = () => {

    if (validator.isEmail(regEmail)){
      setEmailError({error: false, message: ''})
      if (password.length < 8){  
        setPasswordError({error:true, message: 'Password must contain atleast 8 characters'})
      } else {
        setPasswordError({error:false, message: ''})
        if (password === regConfimPasswrod){
          setConfirmPasswordError({error:false, message: ''})
          Axios({
            method: "POST",
            data: {
              username: regUsername,
              email: regEmail,
              password: password,
            },
            withCredentials: true,
            url: 'http://localhost:3001/register',
          }).then((res) => {
            if (res.status===201){
              console.log('redirect')
              setLogin(true)
            } else {
              console.log(res)
              setResponse('User Already Exists')
            }
            if (res.data === 'Already Registered'){
              setEmailError({
                error: true,
                message: 'Email Already Taken'
              })
            }
          });
        } else {
          setConfirmPasswordError({error:true, message: 'Password did not match'})
        }
      }
    } else {
      setEmailError({error: true, message: 'Enter a valid Email'})
    }


  }

  return (
    <div className="App">
      <header className="App-header">
      
      {login 
        ? 
        <Login /> 
        :
        <div className={classes.formControl}>
          <Typography error>{response}</Typography>
          <Typography color='primary' variant='h3' >Register</Typography>

          <TextField  fullWidth size="medium" className="" id="outlined-basic" label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)} />

          <TextField error={emailError.error} helperText={emailError.message} fullWidth size="medium" id="outlined-basic" type="email" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} />

          <TextField type="password" error={passwordError.error} helperText={passwordError.message} fullWidth size="medium" id="outlined-basic" label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} />

          <TextField type="password" error={confirmPasswordError.error} helperText={confirmPasswordError.message} fullWidth className='confirm-password' size="medium" id="outlined-basic" label="Confirm Password" variant="outlined" onChange={(e) => setConfirmPassword(e.target.value)} />

          <Button color="primary" variant="contained" size="large" onClick={register} >Submit</Button>

        </div>
      }

      
      </header>
    </div>
  );
}

export default App;
