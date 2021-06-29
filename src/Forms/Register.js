import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap'

import './Register.css'

import JoblyApi from '../API/api'

const RegisterUser = () => {
    const history = useHistory();

    const dispatch = useDispatch()

    const INITIAL_STATE = {
        username : '',
        password : '',
        firstName : '',
        lastName : '',
        email : '',
    }

    const [formData, setFormData] = useState(INITIAL_STATE)

    const [formErrors, setFormErrors] = useState([])

    console.debug(
        "SignupForm",
        "signup=", typeof signup,
        "formData=", formData,
        "formErrors=", formErrors,
    );

    async function handleSubmit(evt){
        evt.preventDefault();
        const res = await JoblyApi.registerUser(formData)
        if (res) {
            dispatch({ type : 'TOKEN_VALUE', payload : res})
            dispatch({ type : 'LOGGED_IN' })
            history.push("/companies");
        } else {
            setFormErrors(res.errors);
        }
    }


    function handleChange(evt){
        const { name, value } = evt.target;
        setFormData(data => ({...data, [name]: value}));


    }

    return (
        <div className='signup-form'>
            <Form>
                <FormGroup>
                    <Label>Username</Label>
                    <Input type='text' name='username' id='input' placeholder='Username' value={formData.username} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input type='password' name='password' id='input' placeholder='password' value={formData.password}  onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label>First Name</Label>
                    <Input type='text' name='firstName' id='input' placeholder='firstName' value={formData.firstName}  onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Last Name</Label>
                    <Input type='text' name='lastName' id='input' placeholder='lastName' value={formData.lastName}  onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Email</Label>
                    <Input type='email' name='email' id='input' placeholder='email' value={formData.email}  onChange={handleChange} />
                </FormGroup>
                <Button color='success' style={{float : 'right'}} onClick={handleSubmit}>Submit</Button>
            </Form>
        </div>

    )
}

export default RegisterUser;


// username, password, firstName, lastName, email, isAdmin