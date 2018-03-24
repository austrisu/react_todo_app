import React from 'react';
import './component.css';
import { Button } from 'reactstrap';

export const AddButton = props =>(
        <Button color="success" onClick={props.add}>Add</Button>
)


export const RemoveButton = props =>(
        <Button color="danger" className='remove' onClick={props.remove}>X</Button>
)
