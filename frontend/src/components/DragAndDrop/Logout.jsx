import React, { Component } from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';
function Logout() {
    const history = useHistory()
    const handleLogout=()=>{
        Cookies.set("jwt", "");
        history.push('/')
    }

    return ( 
        <ExitToAppIcon onClick={handleLogout}/>
     );
}

export default Logout;