import React from 'react';
import AuthForm from '../forms/authForm';
import PropTypes from "prop-types"
import api from "../../api.js"
import { Route} from 'react-router'
import  { Redirect } from 'react-router-dom'


class RegisterPage  extends React.Component
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
      api.user.register(data).then(res => {
          // console.log(res.data);
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
              <h1>Register Page</h1>
              <AuthForm submit={this.submit}/>
          </div>
        );
    }
}

export default RegisterPage;
// export default LoginPage;
