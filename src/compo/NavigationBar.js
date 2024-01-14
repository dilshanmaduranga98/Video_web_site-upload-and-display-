import React from 'react'
import '../style/navBar.css'
import IsLogging from '../Client page/LoginPage'
import { Navigate, Link, useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';

export default function NavigationBar() {

    const {auth, dispatch} = useAuthContext();

    const navigate = useNavigate();

    const handleLogout = () => {
        handleClickLogout();
        dispatch({type: 'LOGOUT_SUCCESS'});
        navigate('/');
        
    }

  const handleClickLogout = () =>
  {
    fetch('http://localhost:8083/api/v1/logout',
            {
                method :'GET',
                header:{'Accept': 'application/json','Content-Type':'application/json'},
            }   
        )
        .then(resp => {
            console.log(resp);
                if(resp.status === 204){
                  console.log("User Logout!");
                  IsLogging = false;
                  Navigate('/login');
                  
                }
            }
        )
        .catch(error => {
            }
        );
        console.log(IsLogging);
  }
  return (
    <div className='nav_main_container'>
        <div className="navigation_container">
            <div className="logo_container">
                <Link to='/user'><div className="logo"></div></Link>
            </div>

            <div className="link_container">
                 <ul>
                 {auth?.isAuthenticated && auth?.user?.role === 'USER' &&(<li><Link to='/'>Home</Link></li>)}

                    {auth?.isAuthenticated && auth?.user?.role === 'ADMIN' && (<li><Link to='/admin_home'>Home</Link></li>)}
                    <li><Link to='/category'>Category</Link></li>

                    {/* only show after authenticated */}
                    {auth?.isAuthenticated && auth?.user?.role === 'USER' &&(<li><Link to='/live'>Live</Link></li>)}
                    
                    {auth?.isAuthenticated && auth?.user?.role === 'ADMIN' && (<li><Link to='/VideoUpload'>Live</Link></li>)}

                    {auth?.isAuthenticated && auth?.user?.role === 'ADMIN' && (<li><Link to='/admin'>Upload</Link></li>)}

                    {auth?.isAuthenticated && auth?.user?.role === 'ADMIN' && (<li><Link to='/user_Details'>User Details</Link></li>)}
                   

                    {auth?.isAuthenticated && auth?.user?.role === 'USER' && (<li><Link to='/user'>My Profile</Link></li>)}

                    {!auth?.isAuthenticated && (<li><Link to='/login'>Login</Link></li>)}

                    {auth?.isAuthenticated &&(<li><button onClick={handleLogout} style={{background: 'transparent', border: 'none', color: '#fff'}} >Logout</button></li>)}
                 </ul>
            </div>
        </div>        
    </div>
  )
}
