import React from 'react';
import './component.css';
import {AddButton} from './Buttons.js'
import {Input} from 'reactstrap'

export const InputForm = (props) => (
        <div className='taskHeader'>
            <Input value = {props.currentToDo} onChange={props.onInputChange} type="text"/>
            <AddButton add = {props.add}/>
        </div>
)


