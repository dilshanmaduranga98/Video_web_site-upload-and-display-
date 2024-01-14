import React from "react";
import HomePage from "./Client page/HomePage";
import NavigationBar from "./compo/NavigationBar";
import '../src/style/app.css'
import LoginPage from './Client page/LoginPage';
import PasswordInput from './compo/PasswordInput';
import SignupLocal from './Client page/SignupLocal';
import SignupInter from './Client page/SignuoInter';
import UserDetails from './Client page/UserDetails';
import UserUpdate from './Client page/UserUpdate';
import Region from './Client page/Region';
import { Routes, Route } from "react-router-dom";
import SignuoInter from "./Client page/SignuoInter";
import Category from "./Client page/Category";
import Live from "./Client page/Live";
import UploadPage from "./Admin pages/UploadPage";
import AuthRoute from "./utils/AuthRoute";
import Unauthorized from "./utils/Unauthorized";
import UserDetailsTable from "./Admin pages/UserDetailsTable";
import LiveVideoManagement from "./Admin pages/LiveVideoManagement";
import AdminHome from "./Admin pages/AdminHome"


function App() {
  return (
    <div>
      <div className="nvigation_bar_container">
            <NavigationBar/>
      </div>
      <Routes>
        <Route path="/" element ={<HomePage/>}/>
        <Route path="/login" element ={<LoginPage/>}/>

        <Route path="/local_login" element = {<SignupLocal/>}/>
        <Route path="/international_login" element = {<SignupInter/>}/>

        <Route path="/user" element = {<UserDetails/>}/>
        <Route path="/user_update" element = {<UserUpdate/>}/>
        <Route path="/region" element = {<Region/>}/>
        <Route path="/category" element = {<Category/>}/>

        <Route path="/admin_home" element={<AuthRoute roles={['ADMIN']} />}>
          <Route index element={<AdminHome/>}/>
        </Route>


        <Route path="/user_Details" element={<AuthRoute roles={['ADMIN']} />}>
          <Route index element = {<UserDetailsTable/>}></Route>
        </Route>

        <Route path='/live' element={<AuthRoute roles={['USER', 'ADMIN']} />} >
          <Route index element = {<Live/>}/>
        </Route>

        <Route path="/admin" element={<AuthRoute roles={['ADMIN']} />}>
          <Route index element={<UploadPage />}/>
        </Route>

        <Route path="/VideoUpload" element={<AuthRoute roles={['ADMIN']} />}>
          <Route index element={<LiveVideoManagement />}/>
        </Route>

        <Route path='/unauthorized' element={<Unauthorized />} />
      </Routes>
    </div>
  );
}

export default App;
