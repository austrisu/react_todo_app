import React, { Component } from 'react';
import {InputForm} from '../InputForm'
import {Task} from '../Task'
import {NotifErr} from "../NotifErr";
import { ListGroup } from 'reactstrap';
import {NavBar} from "../Navbar";

//TODO create helper with all the functions necesary

class UserPage extends Component
{

    constructor(){
        super();
        this.state = {
            // tasks: ["Todo", "Toda"],
            tasks:[
                {todo:"sdfsdf", isCompleted: false},
                {todo:"sdgsdgg", isCompleted: false}
            ],
            currentToDo: "",
            notifErr: ""
        };
    }

    //copies state of tudos, pushes new walue in coppy, then updates todos with new values
    addTodo = () => {
        if(this.state.currentToDo !== ""){
            let copy = this.state.tasks.slice();
            copy.push({todo:this.state.currentToDo, isCompleted: false });
            this.setState({tasks: copy});

            //resets input field value
            this.setState({
                currentToDo: "",
                notifErr: ""
            });
        } else {

            this.setState({notifErr: "No task entered"});
        }
    };

    onInputChange = e => this.setState({ currentToDo: e.target.value });

    removeTodo = i => {
        let copy = this.state.tasks.slice();
        copy.splice(i, 1);
        this.setState({tasks: copy});
    };

    strikeTodo = i =>{
        let copy = this.state.tasks.slice();
        copy[i].isCompleted = !copy[i].isCompleted;
        this.setState({tasks: copy});
        console.log("tada")
    };

    render() {
        let drawTask = this.state.tasks.map((e,i) => {
            return <Task key={i}
                         todo={e.todo}
                         strike ={() => this.strikeTodo(i)}
                         isCompleted = {this.state.tasks[i].isCompleted}
                         remove={() => this.removeTodo(i)}
            />
        })

        return (
            <div>
                <NavBar/>
                <div className="container">
                    <InputForm
                        currentToDo = {this.state.currentToDo}
                        onInputChange={this.onInputChange}
                        add={this.addTodo}/>
                    <NotifErr message = {this.state.notifErr}/>
                    <ListGroup>
                        {drawTask}
                    </ListGroup>
                </div>
            </div>


        );
    }
}

export default UserPage;
