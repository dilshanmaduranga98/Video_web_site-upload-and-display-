
import React , {useState,Component} from 'react'
import useAuthContext from '../hooks/useAuthContext';
// import {Link} from 'react-router-dom';
import '../style/login.css'
import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Typography } from '@mui/material'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { render } from '@testing-library/react';
import Swal from 'sweetalert2';


function LoginPage() {

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const butnClick = () => 
    {
        console.log("Clicked!");
    }
    
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [IsLogging, setLoggingUser] = useState(false);

    const {dispatch} = useAuthContext();
    

    const userState = e=>
    {
        e.preventDefault();
    }
   
    const navigate = useNavigate();
    const authenticationUser = () =>
    {
        fetch('http://localhost:8083/api/v1/login',
            {
                method :'POST',
                header:{'Accept': 'application/json','Content-Type':'application/json'},
                headers :{
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(username + ':' + password)},
                body:JSON.stringify(
                    {
                        "userName":username,
                        "password":password
                    }
                )
            }   
        )
        .then(resp => {
            console.log(resp);
                if(resp.ok){
                    resp.json().then(data => {
                        console.log(data); // Log the parsed JSON response

                        // store the logged in user's details in context
                        const authData = {
                            id: data.id,
                            username: data.username,
                            password,
                            role: data.role
                        }

                        Swal.fire({
                            icon: 'success',
                            title: 'Successful !',
                            text: 'User login successfully !',
                            customClass: {
                                confirmButton: 'my-button-class'
                              },
                              buttonsStyling: false
                          });
                        // dispatch the action to update the context
                        dispatch({
                            type: 'LOGIN_SUCCESS',
                            payload: authData
                        })

                        if(data.role == 'USER') {
                            setLoggingUser(true);
                        
                            navigate('/live');
                           
                        } else{
                            navigate('/admin')
                        }
                    });           
                }   else if(resp.status === 401){
                    console.log("username or password wrong");
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Username or password wrong!',
                      });
                }
                return IsLogging;
            }
        )
        .catch(error => {
            }
        );
       
    }

    const handleClickUsername = e => 
    {
        e.preventDefault();
        authenticationUser();
    };

  return (
    <div className='login_main_container'>

        <div className="login_form_container" >
            <Card 
                sx={{width:'320px'}}
             >
                <CardContent className='title_container'>
                    <Typography className='title_container_text' gutterBottom variant="h4" component="div">
                        Login
                    </Typography>
                </CardContent>
                <CardContent className='input_feilds'>
                    <Box component="form"
                            sx={{maxWidth: 800 ,
                                '& .MuiTextField-root': { m: 1},
                                }}
                            noValidate
                            autoComplete="off"
                           onSubmit={handleClickUsername}
                    >
                        <TextField
                            id="outlined-Username-input"
                            label="Username"
                            type="Text"
                            autoComplete="off"
                            size="small"
                            value={username}
                            onChange={e=>setUserName(e.target.value)}
                            className='text_feild'
                        />

                        <div>
                            <FormControl sx={{ m: 1}} variant="outlined" size="small"  className='text_feild'>
                                
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                
                            />
                            
                            </FormControl>
                        </div>
                    <div className = 'login_button_div'>
                        <button  className = 'login_button'type='submit'>Login</button>
                    </div>
                       
                    </Box>

                </CardContent>
                <CardContent className='bottom_details'>
               
                    <p>If you don't have an account, please <Link to='/region'>Signup.</Link></p>
                </CardContent>
            </Card>
        </div>

    </div>
  )
}

export default LoginPage


