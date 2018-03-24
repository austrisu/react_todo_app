import React from 'react';
import PropTypes from "prop-types";
import {Button, Form, FormGroup, Label, Input, FormFeedback} from 'reactstrap';

class LoginForm extends React.Component{
    constructor(){
        super();
        this.state = {
            data:{},
            loading: false,
            errors: {}
        };
    }

    onChange = e =>
        this.setState({
            data: {...this.state.data, [e.target.name]: e.target.value}})

    onSubmit = e => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors: errors })

        //is empty method or ES6 Object.keys(errs) takes all the keys
        if (Object.keys(errors).length === 0) {
          this.props.submit(this.state.data)

        }
        // alert(`val: ${"Hallo"}`);
    }

    validate = (data) => {
        const errors = {};

        //TODO cant be special sibols, to short etc
        if(!data.username) {
            errors.username = "Can't be bank";
        }
        if(!data.password){
            errors.password = "Can't be bank";
        }

        return errors;
    }

    render() {

        return(

            //TODO form still reloads

            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                            invalid={!!this.state.errors.username}
                            name="username"
                           id="username"
                           placeholder="What is your username?"
                           value = {this.state.data.username}
                           onChange = {this.onChange}
                    />
                    <FormFeedback invalid >{this.state.errors.username}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input invalid={!!this.state.errors.password}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Make it secure"
                        value = {this.state.data.password}
                        onChange = {this.onChange}
                    />
                    <FormFeedback invalid >{this.state.errors.password}</FormFeedback>
                </FormGroup>
                <Button preventDefault>Submit</Button>
            </Form>
            //test comment
        )
    }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default LoginForm;
