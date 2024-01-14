import React, { useState, useEffect } from 'react';
import useAuthContext from "../hooks/useAuthContext";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,} from '@mui/material';
import '../style/userdetails.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';


function UserDetailsTable() {

    const {auth} = useAuthContext();
    let logedUserName = auth.user?.username;
    let logedUserPwd = auth.user?.password;
    const navigate = useNavigate();

    const [usersID,setusersID] = useState('');
    const getAllUserDetails = () =>{
        fetch('http://localhost:8083/api/v1/users/getAllUsers',
            {
                method :'GET',
                header:{'Accept': 'application/json','Content-Type':'application/json'},
                headers :{
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(logedUserName + ':' + logedUserPwd)
                }
            }
            ) 
        .then(resp => {
            console.log(resp);
                if(resp.ok){
					resp.json().then(data => {
                    console.log(data.data);
                    setTableData(data.data);
                    }
                    );           
                }
            }
        )
        .catch(error => {
            }
        );

    }

    useEffect(() => {
        getAllUserDetails();
    }, []);
        

    const userDelete = (id) =>
        fetch('http://localhost:8083/api/v1/users/deleteUserByUserID?userID='+id,
                {
                    method :'DELETE',
                    header:{'Accept': 'application/json','Content-Type':'application/json'},
                    headers :{
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + btoa(logedUserName + ':' + logedUserPwd)
                    }    
                }   
             )
            .then(resp => {
                console.log(resp);
                    if(resp.ok){
                        resp.json().then(data => {
                            console.log(data); // Log the parsed JSON response
                            Swal.fire({
                                icon: 'success',
                                title: 'Successful !',
                                text: 'User delete successfully !',
                                customClass: {
                                    confirmButton: 'my-button-class'
                                  },
                                  buttonsStyling: false
                              });
                        });           
                    }   else if(resp.status === 404){
                        console.log("this user not in database");
                        Swal.fire({
                            icon: 'error',
                            title: 'Error !',
                            text: 'User not in database !',
                            customClass: {
                                confirmButton: 'my-button-class'
                              },
                              buttonsStyling: false
                          });
                    }
                    else if(resp.status === 406){
                        Swal.fire({
                          icon: 'error',
                          title: 'Warning !',
                          text: "You can't remove an admin!!!!",
                          customClass: {
                              confirmButton: 'my-button-class'
                            },
                            buttonsStyling: false
                        });
                        navigate('/user_Details');
                      }
                }
            )
            .catch(error => {
                }
            );

    const sampleData = [
        {
          id: 1,
          name: 'John',
          country: 'USA',
          phone: '555-1234',
        },
        {
          id: 2,
          name: 'Jane',
          country: 'Canada',
          phone: '555-5678',
        },
        {
          id: 3,
          name: 'Bob',
          country: 'Australia',
          phone: '555-9012',
        },
      ];
      const [tableData, setTableData] = useState([]);

      const handleDelete = (id) => {
        const updatedTableData = tableData.filter((row) => row.id !== id);
        setTableData(updatedTableData);
        userDelete(id);
      };

  return (
    <div className="main_user_table_container">
        
        <div className="user_detail_table_div">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="user table">
                    <TableHead>
                    <TableRow className='table_row_user_table'>
                        <TableCell sx={{color: '#fff'}}>User ID</TableCell>
                        <TableCell sx={{color: '#fff'}}>User Name</TableCell>
                        <TableCell sx={{color: '#fff'}}>Country</TableCell>
                        <TableCell sx={{color: '#fff'}}>Phone Number</TableCell>
                        <TableCell sx={{color: '#fff'}}>Delete details</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {tableData.map((row) => (
                        <TableRow key={row.id}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.username}</TableCell>
                        <TableCell>{row.region}</TableCell>
                        <TableCell>{row.contactNumber}</TableCell>
                        <TableCell>
                            <Button
                            variant="contained"
                            color="error"
                            endIcon ={<DeleteIcon/>}
                            onClick={() => handleDelete(row.id)}
                            >
                            Delete
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </div>
  )
}

export default UserDetailsTable
