import React from 'react';
import AuthForm from '../forms/authForm';
import PropTypes from "prop-types"
import api from "../../api.js"
import { Route} from 'react-router'
import  { Redirect } from 'react-router-dom'


class LoginPage  extends React.Component
{
    constructor(){
        super();
        this.state = {
          tasks:[
              {todo:"sdfsdf", isCompleted: false},
              {todo:"sdgsdgg", isCompleted: false}
          ]
        };
    }

    submit = data => {
      api.user.login(data).then(res => {
          console.log(res.data);
              // TODO: here tasks nedd to be recieved from server
              // TODO: maybe functions can be moved to helper file
              this.props.history.push({
              pathname: '/user',
              // state: { userName: data.username, todo: this.state.tasks }
          })
      }).catch((err) => {
        // TODO: correct error catche should be implemented
        console.log("error catched but nothinc I can do");
        console.log(err);
        // console.log(data);
      })
    }

    render() {
        return (
          <div>
              <h1>Login Page</h1>
              <AuthForm submit={this.submit}/>
          </div>
        );
    }
}

export default LoginPage;
// export default LoginPage;
