import React from 'react';
import {Button} from 'reactstrap';
import {Link} from "react-router-dom"

const UserPage = () => (

            <div>
                <h1>Home page</h1>
                <Button color="success"><Link to="/login">LogIn</Link></Button>
            </div>

    );

export default UserPage;
