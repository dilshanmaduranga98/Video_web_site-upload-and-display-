import React, { useState } from 'react'
import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Typography } from '@mui/material'
import PasswordInput from '../compo/PasswordInput'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import '../style/login.css'
import Swal from 'sweetalert2';


function SignuoInter() {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const [username,setUserName] = useState("");
    const [country, setCountry] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const intUserSingUp = () =>
    {
        
        if(password === confirmPassword){
        console.log("details --> ", "Username:",username," / phoneNumber:", phoneNumber," / password:",password," / confirm password:",confirmPassword);

        fetch('http://localhost:8083/api/v1/usersSingup/saveLocalUser',
            {
                method :'POST',
                header:{'Accept': 'application/json','Content-Type':'application/json'},
                headers :{
                    'Content-Type': 'application/json'},
                body:JSON.stringify(
                    {
                        "username":username,
                        "password": password,
                        "country" : country,
                        "contactNumber":phoneNumber
                    }
                )
            }   
         )
        .then(resp => {
            console.log(resp);
                if(resp.ok){
                    resp.json().then(data => {
                        console.log(data); // Log the parsed JSON response
                        console.log(data.data);
                        navigate('/login');
                        console.log("user succefully registerd you can log now.")
                        Swal.fire({
                            icon: 'success',
                            title: 'Successful !',
                            text: 'International user Signup successfully !',
                            customClass: {
                                confirmButton: 'my-button-class'
                              },
                              buttonsStyling: false
                          });
                    });           
                }   else if(resp.status === 409){
                    console.log("username already taken");
                    Swal.fire({
                        icon: 'error',
                        title: 'Successful !',
                        text: 'User already taken !',
                        customClass: {
                            confirmButton: 'my-button-class'
                          },
                          buttonsStyling: false
                      });
                }
            }
        )
        .catch(error => {
            }
        );
        }
        else
        console.log("passsword not match!!!");
    }
    const handleClickUsernameRegister = e =>
    {
        e.preventDefault();
        intUserSingUp();
    };


  return (
    <div>
        <div className="login_form_container">
            <Card sx={{width:'340px'}}>
                <CardContent className='title_container_signup'>
                    <Typography className='title_container_text' gutterBottom variant="h4" component="div">
                        Signup
                    </Typography>
                    <Typography className='title_container_text_two' gutterBottom variant="h4" component="div">
                        International
                    </Typography>
                </CardContent>
                <CardContent className='input_feilds'>
                    <Box component="form"
                            sx={{maxWidth: 800 ,
                                '& .MuiTextField-root': { m: 1},
                                }}
                            noValidate
                            autoComplete="off"
                            fullWidth
                            onSubmit={handleClickUsernameRegister}
                    >
                        <TextField
                            id="outlined-Username-input"
                            label="Username"
                            type="Text"
                            autoComplete="off"
                            size="small"
                            fullWidth
                            value={username}
                            onChange={e=> setUserName(e.target.value)}
                             
                        />

                        <TextField
                            id="outlined-Country-input"
                            label="Country"
                            type="Text" 
                            autoComplete="off"
                            size="small"
                            fullWidth 
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                        />

                        <TextField
                            id="outlined-Phonenumber-input"
                            label="Phone number"
                            type="Text"
                            autoComplete="off"
                            size="small"
                            fullWidth 
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                        />

                        <TextField
                            id="outlined-Phonenumber-input"
                            label="Password"
                            type="Password"
                            autoComplete="off"
                            size="small"
                            fullWidth
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        <div>
                            <FormControl sx={{ m: 1}} variant="outlined" fullWidth size="small"  >
                            <InputLabel htmlFor="outlined-adornment-password">Confirm password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                <InputAdornment position="end" >
                                    <IconButton
                                    className='visible_button'
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    sx={{width: 'fit-content',border:'none',textDecoration: 'none'}}
                                    >
                                    {showPassword ? <VisibilityOff sx={{fontSize: 20,}}/> : <Visibility sx={{fontSize: 20,width:20}}/>}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Confirm password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value )}
                            />
                            </FormControl>
                        </div>

                    <div className='login_button_div'>
                        <button className='login_button' type='submit'>Signup</button>
                    </div>

                    </Box>

                </CardContent>
                <CardContent className='bottom_details'>
                    
                    <p>If you already have an account, please <a href='/login'>Login.</a></p>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}

export default SignuoInter