import React from 'react';
import './component.css';
import {RemoveButton} from './Buttons.js'
import { ListGroupItem } from 'reactstrap';


export const Task = props =>(
            <ListGroupItem>
                <h3 className={props.isCompleted === true? 'striked':'not-striked'}
                    onClick={props.strike}>
                        {props.todo}
                </h3>
                <RemoveButton remove={props.remove}/>
            </ListGroupItem>
)