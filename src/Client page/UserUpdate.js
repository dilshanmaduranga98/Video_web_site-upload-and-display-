import  React,{ useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import '../style/cliUpdate.css'
import { ExampleComponent1,ExampleComponent2 } from './LoginPage';
import useAuthContext from "../hooks/useAuthContext";
import Swal from 'sweetalert2';




export default function UserUpdate() {

  const {auth} = useAuthContext();
  const navigate = useNavigate();
  const [userNameUpdate, setUserNameUpdate] = useState(auth.user?.username);
  const [CountryUpdate, setCountryUpdatee] = useState("");
  const [PhoneNumberUpdate, setPhoneNumberUpdate] = useState("");
  
  
    let logedUserName = auth.user?.username;
    let logedUserPwd = auth.user?.password;
  const funcUserDetailsUpdate = () =>
{
  fetch('http://localhost:8083/api/v1/users/updateUserByUserId',
            {
                method :'PUT',
                header:{'Accept': 'application/json','Content-Type':'application/json'},
                headers :{
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(logedUserName + ':' + logedUserPwd)
                  },
                body:JSON.stringify(
                    {
						            "id" : auth.user?.id,
                        "username" : userNameUpdate,
                        "region" : CountryUpdate,
                        "contactNumber" : PhoneNumberUpdate
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

                        const authData = {
                          id: auth.user?.id,
                          username: userNameUpdate,
                          password: logedUserPwd,
                          role: auth.user?.role
                        };

                        Swal.fire({
                          icon: 'success',
                          title: 'Successful !',
                          text: 'User login successfully !',
                          customClass: {
                              confirmButton: 'my-button-class'
                            },
                            buttonsStyling: false
                        });

                        navigate('/user'); 
                        console.log("user update succefully ")
                    });           
                }   else if(resp.status === 404){
                    console.log("this user not in database");
                }else if(resp.status === 406){
                  Swal.fire({
                    icon: 'success',
                    title: 'Warning !',
                    text: "You can't remove an admin!!!!",
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

 const handleClickUpdate = e =>
 {
    e.preventDefault();
    console.log("Data store succefully!!!");
    funcUserDetailsUpdate();
     
 }


  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },marginLeft: '50px'
      }}
      noValidate
      autoComplete="off"
      className='client_main_page'
      onSubmit={handleClickUpdate}
    >
    <Typography gutterBottom sx={{color:'#242424',fontFamily:'Calibri',fontSize: '2.5rem',fontWeight:'600'}}>
        User Update
    </Typography>
      <div className='client_detaisl_box' >
        <TextField
          disabled
          id="outlined-username-input"
          label="User name"
          type="Text"
          size='small'
          className='cli_inputs_uni'
          value={userNameUpdate}
          onChange={e => setUserNameUpdate(e.target.value)}
        />

        <TextField
          id="outlined-country-input"
          label="Country"
          type="Text"
          size='small'
          className='cli_inputs_uni'
          value={CountryUpdate}
          onChange={e => setCountryUpdatee(e.target.value)}
        />

        <TextField
          id="outlined-phonenumber-input"
          label="Phone number"
          type="Text"
          size='small'
          className='cli_inputs_uni'
          value={PhoneNumberUpdate}
          onChange={e => setPhoneNumberUpdate(e.target.value)}
        />            
      </div>

      <div>
          <button type='submit' className='client_button_box'>Update</button>
        </div> 
    </Box>
  );
}