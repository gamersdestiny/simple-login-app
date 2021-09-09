import React, { useState } from 'react';
import { Typography, TextField, Button, makeStyles } from '@material-ui/core';
import Axios from 'axios';

// onChange={(e) => setPassword(e.target.value)}

const useStyles = makeStyles({
    root: {
        display: 'flex'
    },
    formControl: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        '& > *':{
          margin: '.5em auto'
        }
    }
})

export default function Login() {
    const classes = useStyles()

    const [logEmail, setlogEmail] = useState([{
        error: false,
        message: ''
    }])
    const [logPassword, setLogPassword] = useState([{
        error: false,
        message: ''
    }])
    const [loginStatus, setLoginStatus] = useState(false);
    const login = () => {
        Axios({
            method: 'post',
            data: {
                email: logEmail,
                password: logPassword
            },
            withCredentials: true,
            url: 'http://localhost:3001/login'
        }).then((res) => {
            if (res.status === 201){
                setLoginStatus(true)
            } 
            if (res.data === 'User Not Found'){
                setlogEmail({
                    error: true,
                    message: 'User Not Found'
                })
            }
            if (res.data === 'Wrong Password'){
                setLogPassword({
                    error: true,
                    message: 'Incorrect Password'
                })
            }
        })
    }

    return (
        <div className="container">
            {loginStatus ? <div className="">
                <Typography variant="h3" color="primary">Login Successful</Typography>
            </div> 
            : 
            <div className={classes.formControl}>
                <Typography variant="h3" color="primary">Login</Typography>
                <TextField required error={logEmail.error} helperText={logEmail.message} fullWidth size="medium" id="outlined-basic" label="Email" variant="outlined" onChange={(e) => setlogEmail(e.target.value)} />
                <TextField type="password" required error={logPassword.error} helperText={logPassword.message} fullWidth size="medium" id="outlined-basic" label="Password" variant="outlined" onChange={(e) => setLogPassword(e.target.value)} />
                <Button color="primary" variant="contained" size="large" onClick={login} >Submit</Button>
            </div>
            }
        </div>
    )
}
