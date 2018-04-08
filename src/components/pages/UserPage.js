import React, { Component } from 'react';
import {InputForm} from '../InputForm'
import {Task} from '../Task'
import {NotifErr} from "../NotifErr";
import { ListGroup } from 'reactstrap';
import {NavBar} from "../Navbar";
import api from "../../api.js"


//TODO create helper with all the functions necesary

class UserPage extends Component
{

    constructor(){
        super();
        this.state = {
            // tasks: ["Todo", "Toda"],
            tasks:
            [

            ],

            currentToDo: "",
            notifErr: "",
            userName: ""
        };
    }


    addTodo = () => {
        if(this.state.currentToDo !== ""){
            let copy = this.state.tasks.slice();
            copy.push({todo:this.state.currentToDo, isCompleted: false });


            api.user.addTodo(copy).then(
              this.setState({tasks: copy})
            ).catch(err=>
                this.sestState({notifErr: "cant add on server"})
            )

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
        api.user.removeTodo(copy).then((res) => {
            this.setState({tasks: copy});
        })
    };

    strikeTodo = i =>{
        let copy = this.state.tasks.slice();
        copy[i].isCompleted = !copy[i].isCompleted;
        api.user.removeTodo(copy).then((res) => {
            this.setState({tasks: copy});
        })
    };

    no = () => {
    }

    onLoad = () => {
      console.log("onload");
        api.user.getUserData().then(res =>{
          console.log(res.data.data);
          this.setState({
            userName: res.data.data.user,
            tasks: res.data.data.todos
          });
          console.log(this.state.tasks);
        })
    }

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
              {(this.state.tasks.length === 0 )? this.onLoad() : this.no()}
                <NavBar username = {this.state.userName}/>
                <div className="container">
                    <InputForm
                        currentToDo = {this.state.currentToDo}
                        onInputChange={this.onInputChange}
                        add={this.addTodo}/>
                    <NotifErr message = {this.state.notifErr}/>
                    <ListGroup>
                        {(this.state.tasks.length !== 0 )? drawTask : this.no()}
                    </ListGroup>
                </div>
            </div>


        );
    }
}

export default UserPage;
